const axios = require('axios');
require('dotenv').config();

let sessionID = '';

async function askForExecutionID() {
    console.log('[UTILS] Asking for execution ID...');

    return new Promise((resolve, reject) => {
        const url = 'https://cas.uphf.fr/cas/login?service=https%3A%2F%2Fvtmob.uphf.fr%2Fesup-vtclient-up4%2Fstylesheets%2Fdesktop%2Fwelcome.xhtml';

        const headers = {
            'Host': 'cas.uphf.fr',
            'Cache-Control': 'max-age=0',
            'Accept-Language': 'en-GB',
            'Origin': 'https://cas.uphf.fr',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.100 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Referer': 'https://cas.uphf.fr/cas/login?service=https%3A%2F%2Fvtmob.uphf.fr%2Fesup-vtclient-up4%2Fstylesheets%2Fdesktop%2Fwelcome.xhtml',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Cookie': 'org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en-GB'
        };

        axios.get(url, { headers })
            .then(response => {
                const executionID = response.data.split('name="execution" value="')[1].split('"')[0];
                resolve(executionID);
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function askForSessionID() {
    console.log('[UTILS] Asking for session ID...');

    return new Promise(async (resolve, reject) => {
        const url = 'https://cas.uphf.fr/cas/login?service=https%3A%2F%2Fvtmob.uphf.fr%2Fesup-vtclient-up4%2Fstylesheets%2Fdesktop%2Fwelcome.xhtml';

        const headers = {
            'Host': 'cas.uphf.fr',
            'Cache-Control': 'max-age=0',
            'Accept-Language': 'en-GB',
            'Origin': 'https://cas.uphf.fr',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.100 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Referer': 'https://cas.uphf.fr/cas/login?service=https%3A%2F%2Fvtmob.uphf.fr%2Fesup-vtclient-up4%2Fstylesheets%2Fdesktop%2Fwelcome.xhtml',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Cookie': 'org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE=en-GB'
        };

        const data = `username=${process.env.username}&password=${encodeURIComponent(process.env.password)}&execution=${(await askForExecutionID())}&_eventId=submit&geolocation=`;
        
        axios.post(url, data, { headers })
            .then(response => {
                const sessionID = response.request.path.split('/')[4].split('=')[1];
                resolve(sessionID);
            })
            .catch(error => {
                console.log(error)
                reject(error);
            });
    });
}

async function askForICS(sessionID) {
    console.log('[UTILS] Asking for ICS...');

    return new Promise((resolve, reject) => {
        const url = 'https://vtmob.uphf.fr/esup-vtclient-up4/stylesheets/desktop/welcome.xhtml';

        const headers = {
            'Host': 'vtmob.uphf.fr',
            'Cache-Control': 'max-age=0',
            'Accept-Language': 'en-GB',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.127 Safari/537.36',
            'Origin': 'https://vtmob.uphf.fr',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Referer': 'https://vtmob.uphf.fr/esup-vtclient-up4/stylesheets/desktop/welcome.xhtml;jsessionid=BF36394CEA1D99CDEFF53B283B516D4F',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Cookie': `JSESSIONID=${sessionID}`
        };

        const data = 'org.apache.myfaces.trinidad.faces.FORM=j_id12&_noJavaScript=false&javax.faces.ViewState=%211&j_id12%3A_idcl=j_id12%3Aj_id15';

        axios.post(url, data, { headers })
            .then(response => {
                if (response.request.host === 'cas.uphf.fr') {
                    reject("Unauthenticated");
                } else {
                    resolve(response.data);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function getICS() {
    try {
        const ics = await askForICS(sessionID);
        return ics;
    } catch (error) {
        if (error === "Unauthenticated") {
            sessionID = await askForSessionID();
            return await getICS();
        }
    }
}

module.exports = { askForExecutionID, askForSessionID, askForICS, getICS };