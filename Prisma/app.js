const express = require("express")
const app = express()
const router = express.Router()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
})
const PORT = process.env.PORT || 5000


router.all("/listAllUser", async (req, res) => {
    try {
        const r = await prisma.user.findMany({
            select: {
                age: true,
                id: true,
                name: true
            }
        })
        res.status(200).json(r)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.post("/createUser", async (req, res) => {
    try {
        const { email, age, name } = req.body
        const r = await prisma.user.create({
            data: {
                email,
                age,
                name
            }
        })
        res.status(200).json(r)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.post("/createUsers", async (req, res) => {
    try {
        const createPersons = await prisma.user.createMany({
            data: [
                { name: 'Bob', email: 'bob@prisma.io' },
                { name: 'Bobo', email: 'bob@prisma.io' },
                { name: 'Yewande', email: 'yewande@prisma.io' },
                { name: 'Angelique', email: 'angelique@prisma.io' },
            ],
            skipDuplicates: true,
        })
        res.status(200).json(createPersons)
        console.log('createPersons', createPersons)
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/findUserById/:userId", async (req, res) => {
    try {
        const { userId } = req.params

        const r = await prisma.user.findFirst({
            where: {
                id: {
                    equals: Number(userId)
                }
            }
        })
        res.status(200).json(r)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/userGroupAndAvg", async (req, res) => {
    const gb = await prisma.user.groupBy({ by: ["name"] })
    const avg = await prisma.user.aggregate({ _avg: { age: true } })
    try {
        res.status(200).json({
            groupBy: gb,
            avg
        })
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/findUsersByQuery", async (req, res) => {
    try {
        const { name, email } = req.query
        const r = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            notIn: [name]
                        }
                    },
                    {
                        email: {
                            in: [email]
                        }
                    }
                ]
            },
            select: {
                age: true,
                id: true,
                name: true
            }
        })
        res.status(200).json(r)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.delete("/deleteAllUser", async (req, res) => {
    try {
        const response = await prisma.user.deleteMany()
        res.status(200).json(response)
        console.log('res', response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.delete("/deleteUserById/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const response = await prisma.user.delete({
            where: {
                id: Number(userId)
            }
        })
        // const res = await prisma.user.deleteMany({
        //     where: {
        //         email: {
        //             contains: "prisma.io"
        //         }
        //     }
        // })
        res.status(200).json(response)
        console.log('res', res)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.put("/updateUserById/:userId", async (req, res) => {
    try {
        //     const res = await prisma.user.updateMany({
        //     where: {
        //         email: {
        //             contains: "prisma.io"
        //         }
        //     },
        //     data: {
        //         email: new Date().toDateString()
        //     }
        // })

        // const res = await prisma.user.upsert({
        //     where: {
        //         email: "deneme@mail.com"
        //     },
        //     create: {
        //         name: "Derya",
        //         email: "deneme@mail.com"
        //     },
        //     update: {
        //         name: "Derya",
        //         email: "deraya@gmail.com"
        //     }
        // })
        const { name } = req.body
        const response = await prisma.user.update({
            where: {
                id: Number(req.params.userId)
            },
            data: {
                name: name
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.post("/createStudentWithLesson", async (req, res) => {
    try {
        const response = await prisma.student.create({
            data: {
                last_name: "Gürses",
                name: "Burçhan",
                lessons: {
                    create: [{
                        lesson_name: "Türkçe"
                    }, {
                        lesson_name: "Matematik"
                    }
                    ]
                }
            },
            include: { lessons: true }
        })
        console.log('response', response)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.get("/studentWithLessons", async (req, res) => {
    try {
        const response = await prisma.student.findMany({
            include: {
                _count: true,
                lessons: {
                    select: {
                        lesson_name: true,
                        id: true
                    },
                    where: {
                        id: 1
                    }
                },

            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.put("/studentUpdate", async (req, res) => {
    try {
        const response = await prisma.student.update({
            where: {
                id: 1
            },
            data: {
                lessons: {
                    update: {
                        where: {
                            id: 1
                        },
                        data: {
                            lesson_name: "İngilizce"
                        }
                    }
                }
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
    }
})

router.delete("/deleteStudent/:dataId", async (req, res) => {
    try {
        const { dataId } = req.params
        const response = await prisma.student.delete({
            where: {
                id: Number(dataId)
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Gerçekleşti" })
        console.log(error)
    }
})


app.use(express.json())
app.use(router)




const connectToDb = async () => {
    try {
        await prisma.$connect()
        console.log("success");
        app.listen(PORT, () => {
            console.log("runnig on port 5000");
        })
    } catch (error) {
        console.log('error', error)
    }
}

const disconnectToDb = async () => {
    try {
        await prisma.$disconnect()
        console.log("success disconnect");
    } catch (error) {
        console.log('error', error)
    }
}

process.on('beforeExit', async () => {
    console.log('beforeExit hook')

})
prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
})

connectToDb()

const test = async () => {
    // const response = await prisma.post.create({
    //     data: {
    //         title: "Bu Post 1",
    //         categories: {
    //             create: [{
    //                 assignedAt: new Date(),
    //                 category: {
    //                     create: {
    //                         name: "Kategori 1"
    //                     }
    //                 }
    //             }]
    //         }
    //     }
    // })

    // const response = await prisma.post.create({
    //     data: {
    //         title: "Bu Post 2",
    //         categories: {
    //             create: [
    //                 {
    //                     assignedAt: new Date(),
    //                     category: {
    //                         create: {
    //                             name: "test 1"
    //                         }
    //                     }
    //                 },
    //                 {
    //                     assignedAt: new Date(),
    //                     category: {
    //                         create: {
    //                             name: "test 2"
    //                         }
    //                     }
    //                 }
    //             ]
    //         }
    //     }
    // })

    const r = await prisma.category.create({
        data: {
            name: "Kategori 100",
            posts: {
                create: [
                    {
                        assignedAt: new Date(),
                        post: {
                            create: {
                                title: "post 1"
                            }
                        }
                    },
                    {
                        assignedAt: new Date(),
                        post: {
                            create: {
                                title: "post 2"
                            }
                        }
                    }
                ]
            }
        }
    })
    console.log('r', r)
}

const listManyToMany = async () => {
    // const r = await prisma.categoriesOnPosts.findMany({
    //     include: {
    //         category: true,
    //         post: true
    //     }
    // })

    // const r = await prisma.post.findMany({
    //     include: {
    //         categories: {
    //             include: {
    //                 post: true,
    //                 category: true
    //             }
    //         }
    //     }
    // })
    // console.log('r', r[0].categories)

    const r = await prisma.post.findMany({
        include: {
            categories: {
                where: {
                    categoryId: 4
                },
                include: {
                    post: true,
                    category: true
                }
            }
        }
    })
    console.log('r', r)
}

const updateManyToManyData = async () => {
    const r = await prisma.post.update({
        where: {
            id: 1
        },
        data: {
            title: "Merhabaaa",
            categories: {
                update: {
                    where: {
                        postId_categoryId: {
                            categoryId: 1,
                            postId: 1
                        }
                    },
                    data: {
                        assignedAt: new Date(),
                        categoryId: 2
                    }
                }
            }
        }
    })
    console.log('r', r)
}

const deleteManyToMany = async () => {
    const r = await prisma.post.delete({
        where: {
            id: 1
        }
    })
    console.log('r', r)
}

const transaction = () => {

    prisma.$transaction([prisma.person.findMany({
        skip: 1,
        take: 5
    })]).then((s) => {
        console.log('s', s)
    }).catch((e) => {
        console.log('e', e)
    })
}

const rawQuery = async () => {
    const result = await prisma.$queryRaw`Select * from public."Person" WHERE id = ${8}`
    console.log('result', result)
}

// test()
// listManyToMany()
// updateManyToManyData()
// deleteManyToMany()
