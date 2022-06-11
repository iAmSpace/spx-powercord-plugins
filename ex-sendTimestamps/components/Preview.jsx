/*
 * Copyright (c) 2020-2021 Cynthia K. Rey, All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const { React, getModule } = require('powercord/webpack');

const ChannelMessage = getModule([ 'getElementFromMessageId' ], false).default;
const Message = getModule(m => m.prototype && m.prototype.getReaction && m.prototype.isSystemDM, false);
const discordSettings = getModule([ 'messageDisplayCompact' ], false);

const CHANNEL = {
  isPrivate: () => false,
  isSystemDM: () => false,
  getGuildId: () => 'uwu',
  isArchivedThread: () => false,
  isThread: () => false
};

const get_msg = (code) => {
    const currentUser = getModule(['getCurrentUser'], false).getCurrentUser();
    return new Message({
        id: 'uwu',
        type: 19,
        author: {
            id: 'b',
            username: currentUser.username,
            toString: () => currentUser.username,
            isSystemUser: () => false,
            isVerifiedBot: () => false,
            isNonUserBot: () => false,
            getAvatarURL: () => currentUser.getAvatarURL()
        },
        content: code
    });
};

function Settings ({ code }) {
  return (
    <div className='diy-timestamp-preview'>
      <ChannelMessage
        compact={discordSettings.messageDisplayCompact}
        channel={CHANNEL}
        message={get_msg(code)}
        id={`uwu-1`}
        groupId='uwu'
      />
    </div>
  );
}

module.exports = React.memo(Settings);
