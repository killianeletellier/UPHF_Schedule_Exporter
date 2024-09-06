const axios = require('axios');
require('dotenv').config();

let sessionID = '';

async function askForSessionID() {
    console.log('[UTILS] Asking for session ID...');

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

        const data = `username=${process.env.username}&password=${encodeURIComponent(process.env.password)}&execution=57f96249-7260-4a0e-ae82-97c8ca69db62_ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0lzSW10cFpDSTZJakEwTnpsaE1UQmtMVGhpTlRjdE5EUXhOQzA1WVRsa0xXSTBPV0prTmpNMlpXRXpNU0o5LjlTMVB3czVFRmJ4cnpPYVAyRGk4eXdycVZwQjR6aWtncmNlQ20zWDNaYUp5ak9XTnJtUGNsMGkzaVpkMUZRLUI2Tms5RUU5dXJmb1JhV081OTlRbVdHUjdpc0E4MzdJdWRna3FRN2dvbWpiUzFOLVlMUjdLRHNtVTVFUFdRSWVRbEhnYjhJNGx0QzRjdHk5TkVjdjFmVVhkMG9fdnVBcUNkMklOSXFoYVhycy1KLUlLeXE4enZOVC1nY1NXS0RtbTdsMGdxN3JjbEhGc20tSDJLdzJJUFAyeW51ckgwWm1tRFFacHhaRU5talQ3SzctZWtTZUVlYUdWeU1wcTlYV25vNXBSREpXVEJJNW1wVDBJV3hQUTRBeEpKOG5BazdoT2RoUUF5MW53NUtJYVdKdVFiQzFwRGRlcEQ1eXExUHF4ck5sQk52SXVYZ1k0ZGcwRWQ5UEtzNkNSaTU3SXlPSG4xMC1NRThKTWVEbHRNc2NzX1ZadHY2cC05V2pyZlhaeVV1RFJNcnBYMU5DVjlZcWZyY2hPSXlwQWlLLUVFQ0pMN2ZHcHVDV0x3SWEySnJNQnRxTXhoMnlweUNjOTZ1YWR3bnpINEJQX21raEhaZ3dXck5Gbk4yWl85eDVENjJCek90cEExYWZfRTJuUEljUjY4VkhwengyOEhwZVJybkE3RUZpN2tSSV91TzlXdV9Vb0FjQUpvY3RmQ1ZuUk1mU0tpNk8zVWVvRkkxRDdob2ItUE5BYlBuMzRHYUlRVGVIc3k5eEpPeU1QOGtnRDdlWlpNSk1paXgzMHNKLU8yWS1sSWpQVGtHOUl3QkdWM19wc2xfU0FjSDdyTFVlNzNrWmlpVklCRnFJVlZMRFExQldRTGFRbnhQTzNxRUFGMmJlRzVZMVRvUE1VSlhYSmN4c1ZGS2tKZ01rRjFRQ0ZSUGJZTWNjbkM3SzJ4ZUFRR1hKMnFqWTE5Z0N1Qlh5WWg1Wmd0WFFBRXBMVXF2MzN0VkhUaXZjNW1KcWRuN1VEbnpsd0hhWjZZd0JGNGlqV1czTXVPZllsNUU0UzB3aFluX2JERjFoOHcwSFpHeDdTZ1ljUlhjVi1DSEtQZ2lMR0pDOXFqOUVvbDhfa2ZQMUJZY3pPTnJNeGFpaHdMSFpYMmFOZTJ3ekcyMUhBclI1RzdmN3ppcWh0djJmMVlVY1lFaThJUUZRNVdPSlZYQlpDYmUwaDVRU2JfNnBySk5mOExFcFdzWTNteE1qb21EV193MTdMNmVHRjR6cGVYUk9WOWdpQlR2TUtYMC0xR1JLa0xHaXdXWFlsTWF1LUxTNE56aWVzdlZSUl9RcW51Ym5PaG5TYkZ3aXlFN05uSkFMYU1kNW5DaVo2eEpobUZtYlA5RHItbmQzb1lBTUZVc1NJOVBuSWNiUnI0Z1JaVUNQbHFMbWhNa1g3cUpoVlIyeDJzWThZck5rNlRCR3hLbHBtY3JkZlotVDhpNFk4Q0pBbEZfS01PYm16cUtZT1VXNXB1YzB6Yml3LTFUZHBHdFgyZ2EyOHl3RC1fMEpNM0d2NGczTzJRbzVrT3NaWnNqUGhEU1BXOHBxSmoxYUdIUjQtTW5mSklXLS1GTVU5eFhoeFFqdEhranp0MWZSYlJPQm1kakNmRWw0d3l0Y094a0hkaWROZ3hXSjhpbGpRWDRUeVhGaGliQkx1NHV2LXBVV3RlejNBVHRJV0RuRWhOdUkxRWlfakpvcHVyb2lKZ0ZXVkJ4cmZHV1J3aEc0N3gtYkZEMTBDWXR1RVpMSDJudE1YV2VOYmNxNVBObzNsWDVLcUtYeS1zY290eEstWjVXZlNINkhTLVJfbERZNkh3ZnlOUHdtMWMwaFExZFI4a3FSNTA1cDFqWm9JNlpmT3hnZDNKWVNHanZtbEdKbkl5QS1fQzVjdllqU0lnTWlDeXR3UFdmSld3RUpUckxLVFpyMHQ2Z0ltdV9TcDZCYV93VnlHYlNxVjZtaWkyc2x1azdfNl9HcU1jamJTOER4UERocXZsVHhwRE9abk5TUkYxZnpPcVRWYkF2eUlXbUNGQ0hoTFp4a2Z4RWZtM2hXZGF6R3Y2RzRmaUNueGZzMTVLNlMzSzhWUjNDQmgzS215MUJCYjlmRGRJMm05d3N4M01ZWVNMdm5ZYjllNmVTOGZuTzdKcm52VW1MUUZUemVzWUN0MmY1U2RIeXpSZDBaRnZzMEFhSHd3Mk11bHBKNDhBYUtITG1oSEhUWUlRWUhsWFIwWkJVRjVkTVE1c0JOV0pDbDladUF1QnNlWm9BeVhpbFlRQjFubVBybjdaUnBjNGlMUTRiTXY4R1p5WHY5ODkwbkUyejBLYi0wT2F2LTU1YTNCSEh0UEgxWE5XbVQyTmh0bkdYUXg1SFpZWEFkZEVWSUlqd0g0OVhVVlU2aEFBeVVxX3Fpam1IVUhLcnBFRW1PX2tvZl9IWktkbGdxWWZLaUVoSmdfUExQU1NPNVNEdWprNzJralE1U0Q3bG9QZkUxUzNtYXdSQ2JRQlA2UjVCR1JWNy1Nd0FJd3Z0Q1lFcEtYX2IwM1lwTEVEQURfLUE3ME5IQU02MzZtZG5QcFBDX3BtWXl2ZG9xQ29OdkVhTnFlNy1FZWtkVlU0YkwzaDFwSDlXdG5ZSk9zMWVGNjE0M2dIaU9vWTBnLUNLQlFtb3AwMnotcWdzTnJOb2FGamdMVTI1SnhQUk9YTmUxTGpYNUZEelNQUWlBSWVLYXJYYWQ2R3k0LUFLT2tXQ3lNaUdyS3ZzbkpKZDVkNGNsVDgweGMydGp3S2Uxc1FJTENSVWtIWVhNTmtlRG5QcTdlUU9JaFVfWWV1Tl9VMmg0VTJSc1lQS3dkYWRwcVpQdURGbzNad1FsVWdwME9hQ1JFdmhzMTNkOFU3MHZKVHNRRXk4Wm92cHd1UTFZVjd0a0l1YU5JNW9mSDM3azZLNTkyc29oeHNFN3dCN01UalEyU0VhN0I0cEt5R09OcF9fWUFjTGlPdzZmWmFGNFo1UEFQYUlPWXZsOUg5TE1lUTR4Mk55MnNuWTM0RU5VRlBtUmhLLXZVd0NFVXNhQkE4NW54MndqSWJHcXRzWDVLU00tRG92ZDV0ZGZXMHNNV2lINFl3ekphLVdwZE1zUXJxM3JSYlkxVmtGODdScDkxazVjOFpXUkVNLW13VVBDbVN4VmFfX01mbDN0SHo3TFQ0NzVFSmRvTEFGdk5NakpCNkVNRzBweFd2WlNCaGVLNC11all4S2FsNHZRU2IySnkwbEZ4R3hSYVBYY0FEdnFSTGxnTFZsQ0Q1R01PNnNqaE9oZUFXR3hrLVNDbGZKeWVNQk51Z1l4YlJzSk9FQVh1VUlqbDBRYTllbkFVNjNLUV9kYXZ5dlR3VVRId3daVjdOSzF5VW1GeXViaUVKRW51aWwzZGd1ZkN2R2hPNHZyUVdFa2JjbDlmUDZZU2NYWGxxMVFxMWx2ekRqSWxxUnluNFpsR2VzVkN2M0ZDLWxHXzhYV1N3VUQycG04YllURGszRU5XRlMtTkJlQnBONnQwUHpkeldpRWhiWHRnTkVscVhXUFlRdGlQaC1JN1RQSFhEbHlteXJUdG1HSXdRaUxDNW55V29qOFJxdzZ2ODlaMnRLd050TkZnMUpqUkdITGU4SEczdWl3V3I2UkNhMzFObW1tVTJ1dnFBYUhpZGZEUVhKeEY2enlRallwZGY2bmZWZElGemdRWmNocDN0TzJXaW4zanljLWU2SGlKVnk0ZDNfakJqcHdYZVNpN1AzSzMxemk1VjhEellGSzQwdDIwNm5oTmdDdDRZdmszSkU1ekduWWowYmhnNTZFeDVSSURtU2NiVk1nZjVfXzVYTWd4V21vaFpGZUtQX1IzWnJSRU5LS2pkVlFmUHlCd3ZuTGh3c0ZUN1dWS0FuNVBsTnQtSWdlRFpta1JxWXp0QVRGUnBJSnBuRGJjMjd1cTNBajd1TG5QbzNMTEZEVklwamdxZV9CU21nQzBNREI5cFY2b0pYeDVzZDVCS2s1Ym9zTHpfcXVLRHRMblVEc2I0Y2M4V0ExVEpaTjlld2lYYzRlUndTTjhOcHkyOEFZTjd1Vm1jTTI1MVJ4RGwxUE5kQmRDU29lOVlsdUluZzNxbERFNWJKbURzZTNsZHd2Q191ejJSenFIQ2xQVDVNemZvYU9DdW5DVHBFUWVEbXc3ekFlcDZmMjZQcEtMZm1lNnF0bzYwanNiR2NtRDdqYWRfNXpEQkFVZk1UQWlZWkx5OEJuWWVHNXg2TU9acEZoc1BVeGg3V2ZoVm5zSHpHRldmTFRVSHF6QWVwaWtBVWczREVDdkhyU3oxc0RtSmdBb1J5bWJDWXFmN2YtdVNnRXFpWUNXQTRoem5IVm5TbFFSeWwxaThST0d6Z2xnaWlDODk5YWRCbEd1WlhoTDAtY0l4RjE3QWdsanhRWFRIWXhSa0dBR3NZY0poTjNScUNiSVZRREpDaENWbE5LRl9odHBaTnE3Vjl6WWVTenVJaEp1dmZPRFdObjJJQTJRX2NaRG10Z1RfUkNzckRxYzMwM1ZuUC1ZLVU1OUY4c3BubjBrSnhTc3J6dGtmTU9xVG1vRGJqWk5HV3MyMVJDTHV4djhYdWRRZ3d6U0VTa2V0Z0I2OGZfb3BNcXFBbEVwclV1NWtTN21rdlloUXBWd0tpeWpJUkphWktMc1RUbE5RQmZDcUdxbmR1R3pOWlh5YWtWbHlCWS02SVhMOGFRSWtibEJmT0J5a01TelJZclktZnFucFpfMDkwVVBvSXNRMFBkOWRGeGNZVFUxYkc5a21QZzJsbmVvMnp4MnJCb00wTV9OV0pieHBkSUZ5bktaUmJUZktBR09mTDRlMGZxaXdzVUJ5a05EUW1OR1o4aG5TVUxTRjhpZkxBX0pfWEMwVHZ4SEFKSXJTZmZfQ3drOGFXeFhfaXhGVlpJZE16V01sUnc2a0NkN25FMndlRGhNN1Bobkpmb1VhM2I1cERkSm5ndHEtMHZNOTVtM0V6VG5zNDRZRFlCcmNqVTQ2ZUkybGlIakxJaWJ4dUNoV05NejJCXzBHMk04bTVGTmZkR0hlYWdOTlBZNmNlbkNGY1dBeVdlYzJlZU45M05fLTh4c0RMNjVnN01tWEcxQWJEU1NONXlHeDRLMzZhcENsZml4YjI0S1Y3NHUyNzlSaF8zRFoyb285bTJ6NHNEc1FGMWJENUIwUkgyVDc2Rkc0YlhCWXoxeE1BVVdYVjhzZFIyU3Qzc2ZtZVZhd24ybzV0UHF1b3gzUTN2bjdVTUVtbnRneEVKNjRaYklMVnhueHJ4TkNsOHZZY05xdHZMdlU1b3NJRjhPZ21MLXNZemJTWTBWbHFlaFZiLVBIbU95LVJKMXBnYk1rR21jLmE1OGJ2VEE1dnBPaGlJYWxTSVpWSGNydGNFSTQ5N0dGeVkyb0lxb2hMZmFmOTFpMWVLMkU0a0NtVTJtVkpWTWg3V3VFX0p5NWxqTjFtTXRSaVRGajRB&_eventId=submit&geolocation='`;

        axios.post(url, data, { headers })
            .then(response => {
                const sessionID = response.request.path.split('/')[4].split('=')[1];
                resolve(sessionID);
            })
            .catch(error => {
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

module.exports = { askForSessionID, askForICS, getICS };