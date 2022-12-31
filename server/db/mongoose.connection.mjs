import mongoose from 'mongoose'
import log      from '@ajar/marker'

export const connect_db = async uri => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    await mongoose.connect(uri,options)
    log.magenta(' ✨  Connected to Mongo DB ✨ ')
}
