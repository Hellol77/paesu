const axios = require('axios') // http 모듈
const xml2js = require('xml2js') // xml 파싱 모듈

// 국세청 사업자번호 조회 API [POST]
const postUrl = "https://teht.hometax.go.kr/wqAction.do?actionId=ATTABZAA001R08&screenId=UTEABAAA13&popupYn=false&realScreenId="

// API 에 raw 로 올라갈 xml 데이터
const xmlRaw = "<map id=\"ATTABZAA001R08\"><pubcUserNo/><mobYn>N</mobYn><inqrTrgtClCd>1</inqrTrgtClCd><txprDscmNo>{CRN}</txprDscmNo><dongCode>15</dongCode><psbSearch>Y</psbSearch><map id=\"userReqInfoVO\"/></map>"

if (!CRNumber) {
    console.log("매개변수에 사업자등록번호를 입력하십시오")
    return
}
postCRN(CRNumber).catch(err => console.log(err))
    .then(result => console.log(result))

function postCRN(crn) {
    return new Promise((resolve, reject) => {
        axios.post(postUrl, xmlRaw.replace(/\{CRN\}/, crn), // xml 데이터에 사업자등록번호를 추가
            { headers: { 'Content-Type': 'text/xml' } })
            .catch(err => reject(err))
            .then(result => {
                getCRNresultFromXml(result['data']) //API 응답의 'data' 텍스트 파싱
                    .catch(err => reject(err))
                    .then(CRNumber => resolve(CRNumber))
            })
    })
}

function getCRNresultFromXml(dataString) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(dataString, // API 응답의 'data' 에 지정된 xml 값 추출, 파싱
            (err, res) => {
                if (err) reject(err)
                else resolve(res.map.trtCntn[0]) // trtCntn 이라는 TAG 의 값을 get
            })
    })
}