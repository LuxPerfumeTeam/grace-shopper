'use strict'

const db = require('../server/db')


const {Product, User, Review, Category} = require('../server/db/models')


const categories = [
  {
    name: 'Women'
  },
  {
    name: 'Men'
  }
]

const products = [
  {
    name: 'Chanel N°5 Parfum',
    description:
      'The now and forever fragrance. The ultimate in femininity. N°5 continues to inspire devotion and garner acclaim, recently winning Allure Magazines Readers Choice Award for Best Classic Fragrance. In parfum form — the most powerful, long-lasting concentration of fragrance — N°5 is elevated to the fullest expression of the perfumers art. The Classic Bottle is an attractive addition to any dressing table.',
    price: 210,
    inventory: 100,
    image: 'woman1.png',

    categoryId: 1

  },
  {
    name: 'Chanel CHANCE EAU FRAÎCHE Eau de Toilette',
    description:
      'A fresh, sparkling floral expression of CHANCE—a surge of energy that sweeps you into a whirlwind of happiness and fantasy.',
    price: 102,
    inventory: 100,
    image: 'woman2.png',

    categoryId: 1

  },
  {
    name: 'Chanel CHANCE EAU TENDRE Eau de Toilette',
    description:
      'A youthful, romantic expression of CHANCE—a constellation of tender and vibrant notes, at once delicate and airy, with an intoxicatingly light, fruity trail.',
    price: 102,
    inventory: 100,
    image: 'woman3.png',

    categoryId: 1

  },
  {
    name: 'Chanel ALLURE HOMME Eau de Toilette',
    description:
      'Difficult to define, and impossible to resist. Crisp and clean, warm and sexy, ALLURE HOMME is the expression of a mans charisma and inner strength.',
    price: 95,
    inventory: 100,
    image: 'man1.png',

    categoryId: 2

  },
  {
    name: 'Chanel PLATINUM ÉGOÏSTE Eau de Toilette',
    description:
      'Invigorating, woody fougère scent. The most potent, long-lasting form of mens fragrance.',
    price: 95,
    inventory: 100,
    image: 'man2.png',

    categoryId: 2

  },
  {
    name: 'Chanel BLEU DE CHANEL PARFUM',
    description:
      'The most intense of the BLEU DE CHANEL fragrances. Powerful and refined, BLEU DE CHANEL Parfum for men reveals the essence of determination.',
    price: 150,
    inventory: 100,
    image: 'man3.png',

    categoryId: 2

  }
]

const user = [
  {
    firstName: 'Amy',
    lastName: 'Johnson',
    email: 'user1@email.com',
    password: '1234',
    admin: true
  },
  {
    firstName: 'Elvis',
    lastName: 'King',
    email: 'user2@email.com',
    password: '1234',
    admin: false
  }
]

const reviews = [
  {
    description: 'Best smelling colgne it speak for itself. Alluring!!',
    productId: 6,
    userId: 1
  },
  {
    description:
      "THE BEST. Seems like many other high end brand do their version of a fresh, earthy kind of scent. I've repurchased this again and again, and wanted to branch out but nothing smells as clean and balanced as this scent. It's a staple. 10 out of 10 for this.",
    productId: 2,
    userId: 2
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${user.length} user`)
  console.log(`seeded ${reviews.length} reviews`)

  console.log(`seeded successfully`)

  return Category.bulkCreate(categories)
    .then(() => Product.bulkCreate(products))
    .then(() => User.bulkCreate(user))
    .then(() => Review.bulkCreate(reviews))
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
