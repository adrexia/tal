/**
 * @preserve Copyright (c) 2014 British Broadcasting Corporation
 * (http://www.bbc.co.uk) and TAL Contributors (1)
 *
 * (1) TAL Contributors are listed in the AUTHORS file and at
 *     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
 *     not this notice.
 *
 * @license Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * All rights reserved
 * Please contact us for an alternative licence
 */

(function() {
    this.CEHTMLPlayBeforeSeekWhenPlayFromPausedMediaPlayerTests = AsyncTestCase("CEHTMLPlayBeforeSeekWhenPlayFromPausedMediaPlayer");

    var config = {"modules":{"base":"antie/devices/browserdevice","modifiers":["antie/devices/mediaplayer/cehtmlplaybeforeseekwhenplayfrompaused"]}, "input":{"map":{}},"layouts":[{"width":960,"height":540,"module":"fixtures/layouts/default","classes":["browserdevice540p"]}],"deviceConfigurationKey":"devices-html5-1"};

    this.CEHTMLPlayBeforeSeekWhenPlayFromPausedMediaPlayerTests.prototype.testPlayFromWhenPausedCallsPlayBeforeSeek = function(queue) {
        expectAsserts(3);
        this.runMediaPlayerTest(this, queue, function (MediaPlayer) {
            this._mediaPlayer.setSource(MediaPlayer.TYPE.VIDEO, 'http://testurl/', 'video/mp4');
            this._mediaPlayer.playFrom(0);
            this.deviceMockingHooks.sendMetadata(this._mediaPlayer, 0, { start: 0, end: 100 });
            this.deviceMockingHooks.finishBuffering(this._mediaPlayer);
            this._mediaPlayer.pause();

            this.fakeCEHTMLObject.play.reset();
            this.fakeCEHTMLObject.seek.reset();

            this._mediaPlayer.playFrom(10);

            assert(this.fakeCEHTMLObject.seek.calledOnce);
            assert(this.fakeCEHTMLObject.play.calledOnce);
            assert(this.fakeCEHTMLObject.play.calledBefore(this.fakeCEHTMLObject.seek));
        });
    };

    // Mixin the common tests shared by all HTML5 MediaPlayer implementations
    window.commonTests.mediaPlayer.cehtml.mixinTests(this.CEHTMLPlayBeforeSeekWhenPlayFromPausedMediaPlayerTests, "antie/devices/mediaplayer/cehtmlplaybeforeseekwhenplayfrompaused", config);

})();
