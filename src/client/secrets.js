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

module.exports.getSecret = function(token, baseUrl, path) {
    const uri = `${baseUrl}/v2/tenants/secrets/${path}`
    return request
        .get(uri)
        .set('Authorization', `Bearer ${token}`)
//        .set('X-Vault-Token', 'developer-token-123')
        .then((res) => {
            if (res.ok) {
                return {success: true, message: res.body};
            }
            return {success: false, message: res.body, status: res.status};
        })
}

