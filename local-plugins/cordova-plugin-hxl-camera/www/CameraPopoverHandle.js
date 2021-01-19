/**
 * @ignore in favour of iOS' one
 * A handle to an image picker popover.
 */
var CameraPopoverHandle = function () {
    this.setPosition = function (popoverOptions) {
        console.log('CameraPopoverHandle.setPosition is only supported on iOS.');
    };
};

module.exports = CameraPopoverHandle;
