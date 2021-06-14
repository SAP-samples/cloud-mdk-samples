import * as app from 'tns-core-modules/application';
import { IControl } from 'mdk-core/controls/IControl';
import { BaseObservable } from 'mdk-core/observables/BaseObservable';
import { screen } from 'tns-core-modules/platform';

export class VideoPlayer extends IControl {
    private _observable: BaseObservable;
    private _videoURL: string;
    private _avplayerViewController: AVPlayerViewController;
    private _avPlayer: AVPlayer;

    private _videoView: android.widget.VideoView;

    public initialize(props) {
        super.initialize(props);

        const sVideoURL = this.definition().data.ExtensionProperties.videoURL;

        if (app.ios) {
            this._avplayerViewController = AVPlayerViewController.new();
            this._avplayerViewController.view.frame = CGRectMake(0, 0, 0, 2000);
            this._avplayerViewController.entersFullScreenWhenPlaybackBegins = true;
            this._avplayerViewController.showsPlaybackControls = true;
        }

        if (app.android) {
            this._videoView = new android.widget.VideoView(this.androidContext());
            var mediaController = new android.widget.MediaController(this.androidContext());
            mediaController.setAnchorView(this._videoView);
            this._videoView.setMediaController(mediaController);
        }

        this.valueResolver().resolveValue(sVideoURL).then((resolvedValue) => {
            this._videoURL = resolvedValue;
            if (app.ios) {
                this._avPlayer = AVPlayer.playerWithURL(NSURL.URLWithString(this._videoURL));
                this._avplayerViewController.player = this._avPlayer;
                if (this._avPlayer) {
                    this._avPlayer.play();
                }
            }
            if (app.android) {
                var uri = android.net.Uri.parse(this._videoURL);
                this._videoView.setVideoURI(uri);
                this._videoView.start();
            }
        });
    }


    public view() {
        if (app.ios) {
            return this._avplayerViewController.view;
        }
        if (app.android) {
            return this._videoView;
        }
    }

    public viewIsNative() {
        return true;
    }

    public observable() {
        if (!this._observable) {
            this._observable = new BaseObservable(this, this.definition(), this.page());
        }
        return this._observable;
    }

    public setContainer(container: IControl) {
        // do nothing
    }

    public setValue(value: any, notify: boolean, isTextValue?: boolean): Promise<any> {
        return Promise.resolve();
    }
}