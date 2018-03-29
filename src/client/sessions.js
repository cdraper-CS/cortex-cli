/*
 * Copyright 2018 Cognitive Scale, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const request = require('superagent');
const debug = require('debug')('cortex:cli');

module.exports = class Sessions {

    constructor(cortexUrl) {
        this.cortexUrl = cortexUrl;
        this.endpoint = `${cortexUrl}/v2/sessions`;
    }

    listSessions(token) {
        debug('listSessions() => %s', this.endpoint);
        return request
            .get(this.endpoint)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                if (res.ok) {
                    return {success: true, sessions: res.body.sessions};
                }
                return {success: false, status: res.status, message: res.body};
            });
    }

    describeSession(token, sessionId) {
        const endpoint = `${this.endpoint}/${sessionId}`;
        debug('describeSession(%s) => %s', sessionId, endpoint);
        return request
            .get(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                if (res.ok) {
                    return {success: true, session: res.body};
                }
                else {
                    return {success: false, message: res.body, status: res.status};
                }
            });
    }

    deleteSession(token, sessionId) {
        const endpoint = `${this.endpoint}/${sessionId}`;
        debug('deleteSession(%s) => %s', sessionId, endpoint);
        return request
            .delete(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                if (res.ok) {
                    return {success: true, message: res.body};
                }
                return {success: false, message: res.body, status: res.status};
            });
    }

    addDataToSession(token, sessionId, instanceId) {
        const endpoint = `${this.endpoint}/${instanceId}/${sessionId}`;
        debug('addDataToSession(%s, %s) => %s', sessionId, instanceId, endpoint);
        return request
            .post(endpoint)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                if (res.ok) {
                    return {success: true, message: res.body};
                }
                return {success: false, message: res.body, status: res.status};
            });
    }
};