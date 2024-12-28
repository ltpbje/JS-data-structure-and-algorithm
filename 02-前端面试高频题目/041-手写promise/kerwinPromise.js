function KerwinPromise(executor) {
    this.status = 'pending';
    this.result = undefined;
    var _this = this;
    function reslove(res) {
        _this.status = 'fulfilled';
        _this.result = res;
        // console.log('reslove');
    }
    function reject() {
        _this.status = 'rejected';
        _this.result = res;
    }
    executor(reslove, reject);
}

KerwinPromise.prototype.then = function (successCB, failCB) {
    if (this.status === 'fulfilled') {
        successCB && successCB(this.result);
    } if (this.status === 'rejected') {
        failCB && (this.result);
    }
};