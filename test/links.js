import http from 'k6/http';
import { sleep, check } from 'k6';
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
    return {
        "stdout": textSummary(data, { indent: ' ', enableColors: true }),
    };
}


// ! CHECK FOR 10s HOW MANY REQ CAN MAKE FOR 1 vus
// export const options = {
//     vus: 1,
//     duration: '10s'
// }
    

export const options = {
    // thresholds: {
    //     http_req_failed: [
    //         {
    //         threshold:'rate<0.1',
    //         abortOnFail: true,
    //         delayAbortEval: "10s", // evaluate the condition after 10s
    //     }] // should be less than 1% for breakpoint
    // },
    scenarios: {
        // breakpoint: {
        //     executor: 'ramping-arrival-rate',
        //     startRate: 0,
        //     timeUnit: '1s',
        //     preAllocatedVUs: 10000, // start with 100 virtual users
        //     maxVUs: 10000, // limit virtual users to 200
        //     stages: [
        //         { duration: '10m', target: 1000 }, // max normal load
        //     ],
        // },
        // load: {
        //     executor: 'ramping-arrival-rate',
        //     startRate: 0,
        //     timeUnit: '1s',
        //     preAllocatedVUs: 1000, // start with 1000 virtual users
        //     maxVUs: 100000, // limit virtual users to 10000
        //     stages: [
        //         { duration: '1m', target: 60 },
        //         { duration: '5m', target: 60 },
        //         { duration: '1m', target: 0 },
        //     ],
        // },
        // stress: {
        //     executor: 'constant-arrival-rate',
        //     rate: 1,
        //     timeUnit: '1s',
        //     preAllocatedVUs: 1000,
        //     maxVUs: 2000,
        //     duration: '10s',
        // },
        // smoke: {
        //     executor: 'constant-vus',
        //     vus: 1,
        //     duration: '1s',
        // }
    },
};


export default function () {
    // * IMPORTANT
    // * when trying using LOCALHOST and run DOCKER K6, endpoint using "http://172.23.163.228:8086/"
    // * https://levelup.gitconnected.com/load-testing-with-k6-48488c7946bb

    // * NAMUN KETIKA K6 DIINSTALL LANGSUNG DIWINDOWS BISA LANGSUNG JALANKAN PAKAI LOCALHOST DAPAT BERJALAN NORMAL
    // const endpoint = "http://localhost:8086"
    const endpoint = "https://mandorin-be-mdmlfcl63q-et.a.run.app"
    const options = {
        headers: {
            accept: 'application/json',
            // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywiaWF0IjoxNzEwNDIxODQxLCJleHAiOjE3MTEwMjY2NDF9.6PEiBLMJqnsmpjRV6U4MnD2_ruvJToyLP46FmUuEGao'
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRlZWEwMWY5MGY2MTkxZjcyMGM4Y2QzIiwiYXV0aCI6IjU2OWNhNjkxMTY0NmRjYzJlMzVjODIxNWJiNTBmMjJiIiwiaWF0IjoxNjk1MjE5OTkzfQ.NscQcwAyx3aLFS_LjuPw9QPOEnjueE_jVsqiIrXua6U'
        }
    }

    const res = http.get(`${endpoint}/users/self`
        , options
    );
    
    check(res, {
        'is status 200': (r) => r.status == 200,
    })
    // console.log(res.status)
}
