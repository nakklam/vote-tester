//const url = "http://27.254.172.82:8000"
const url = "http://localhost:8000"

var Testcase = function() {

  const Request = require("request");
  const querystring = require('querystring');

  var register = (seqNo, beginTime, cid, lineid, name) => {
    var operation = (resolve, reject) => {
      Request.post({
        "headers": { "content-type": "application/json" },
        "url": url+"/user/create",
        "body": JSON.stringify({
          "lineid": lineid,
          "cid": cid,
          "name": name
        })
      }, (error, response, body) => {
        if(error) {
          return reject(error);
        }

        return resolve(body)
      });
    }

    return new Promise(operation);
  }

  var vote = (seqNo, beginTime, qid, aid, lineid)=>{
    var operation = (resolve, reject) => {
      Request.post({
        "headers": { "content-type": "application/json" },
        "url": url+"/vote/createVote",
        "body": JSON.stringify({
          "qid": qid,
          "aid": aid,
          "lineid": lineid
        })
      }, (error, response, body) => {
        if(error) {
          return reject(error);
        }

        return resolve(body)
      });
    }

    return new Promise(operation);
  }

  var getQuestionOfStatus = (seqNo, beginTime, status)=>{
    var operation = (resolve, reject) => {
      Request.get(url+"/poll/getQuestionOfStatus?status="+status, (error, response, body) => {
        if(error) {
          return reject(error)
        }

        return resolve(body)
      });
    }
    return new Promise(operation);
  }

  var getVote = (seqNo, beginTime, qid)=>{
    var operation = (resolve, reject) => {
      Request.get(url+"/vote/getVote?qid="+qid, (error, response, body) => {
        if(error) {
          return reject(error)
        }

        return resolve(body)
      });
    }
    return new Promise(operation);
  }

  var loopTest = (numLoop, numDelay, beginTime, testFuction)=> {
    console.log("Begin of Loop")

    var i = 0
    var myLoop = ()=>{
      setTimeout(function () {
        testFuction(i, beginTime)
        i++
        if (i < numLoop) {
          myLoop()
        }else{
          console.log("End of Loop")
        }
      }, numDelay)
    }

    myLoop();
  }

  var testcaseFunction1 = (seqNo, beginTime)=>{
    let lineid = "line-10001"+seqNo
    let cid = "10100095"+seqNo
    let name = "nueng"+seqNo
    let qid = "16657b9af67"
    let aid = qid+"-"+ (seqNo%4)

    //register(seqNo, beginTime, cid, lineid, name).then((response)=>{
    //  let totTime = new Date().getTime()-beginTime
    //  console.log(`register Response : No:${seqNo} time:${totTime} result:${response}`)
    //})

    vote(seqNo, beginTime, qid, aid, lineid).then((response)=>{
      let totTime = new Date().getTime()-beginTime
      console.log(`vote Response : No:${seqNo} time:${totTime} result:${response}`)
    })

    // getQuestionOfStatus(seqNo, beginTime, "vote").then((response)=>{
    //   let totTime = new Date().getTime()-beginTime
    //   console.log(`getQuestionOfStatus Response : No:${seqNo} time:${totTime} result:${response}`)
    // })

    // getVote(seqNo, beginTime, qid).then((response)=>{
    //   let totTime = new Date().getTime()-beginTime
    //   let result = JSON.parse(response)
    //   console.log(`getVote Response : No:${seqNo} time:${totTime} result:${result.text}`)
    // })

    //console.log("Hello ", seqNo)
  }

  var doCase1 = ()=>{
    console.log("Begin Test")
    let beginTime = new Date().getTime()
    loopTest(35,0,beginTime,testcaseFunction1)
  }

  return({
    doCase1 : doCase1
  })
}

module.exports = Testcase
