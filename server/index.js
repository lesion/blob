// import express from 'express'
// import bodyParser from 'body-parser'
// import cohort from './cohort.js'
// import cohorts from './cohorts.js'
// import posts from './posts.js'
// import source from './source.js'
// import auth from './auth.js'
// import tag from './tag'


// const api = express()
// api.use(bodyParser.json())
// api.use('/cohort', cohort)
// api.use('/cohorts', cohorts)
// api.use('/posts', posts)
// api.use('/source', source)
// // api.use('/auth', auth)
// // api.use('/tag', tag)

// api.use((_req, res) => {
//   console.error('404!')
//   return res.status(404).json(err)
//   // next()
// })

// api.use((err, _req, res ) => {
//   console.error('sono asodifaosdijf');
//   console.error(err);
//   return res.status(500).json({error: 'an error occurred'});
// })

// export default api