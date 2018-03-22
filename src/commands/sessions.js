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

const fs = require('fs');
const debug = require('debug')('cortex:cli');
const { loadProfile } = require('../config');
const Sessions = require('../client/sessions');
const { printSuccess, printError, filterObject, parseObject, printTable } = require('./utils');

module.exports.ListSessionsCommand = class ListSessionsCommand {

    constructor(program) {
        this.program = program;
    }

    execute(options) {
        const profile = loadProfile(options.profile);
        debug('%s.executeListSessions()', profile.name);

        const sessions = new Sessions(profile.url);
        sessions.listSessions(profile.token).then((response) => {
            if (response.success) {
                let result = response.sessions;
                if (options.query)
                    result = filterObject(result, options);

                if (options.json) {
                    printSuccess(JSON.stringify(result, null, 2), options);
                }
                else {
                    const tableSpec = [
                        { column: 'Name', field: 'name', width: 50 },
                        { column: 'Title', field: 'title', width: 25 },
                        { column: 'Description', field: 'description', width: 50 },
                        { column: 'Created On', field: 'createdAt', width: 26 }
                    ];

                    printTable(tableSpec, result);
                }
            }
            else {
                printError(`Failed to list sessions: ${response.status} ${response.message}`, options);
            }
        })
            .catch((err) => {
                debug(err);
                printError(`Failed to list sessions: ${err.status} ${err.message}`, options);
            });
    }
};
