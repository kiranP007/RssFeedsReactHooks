import Parser from 'rss-parser'
import {CORS_PROXY} from '../constants/common'
import {rssFeedParserErrObj} from '../constants/errorMessages/common'

const rssFeedParser = (link) => {
    return new Promise((resolve, reject) => {
        let parser = new Parser();
        parser.parseURL(CORS_PROXY + link.trim(), function(err, feeds) {
            if(err) {
                reject({error:true, msg: rssFeedParserErrObj.notValid}) 
            }
            if(feeds) {
                if(feeds.hasOwnProperty("items")) {
                    resolve({feeds: feeds.items})
                } else {
                    reject({error: true, msg: rssFeedParserErrObj.noSupport}) 
                }
            }
            reject({error:true, msg: rssFeedParserErrObj.somethingWentWrong})
        })
    })
}

export default rssFeedParser