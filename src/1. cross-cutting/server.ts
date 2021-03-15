import { MongoDbHelper } from '../7. infra/database/mongodb/helper/mongodb.helper'
import env from './config/env'

MongoDbHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
