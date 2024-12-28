function KerwinPromise(executor) {
    this.status = 'pending';
    this.result = undefined;
    this.cb = [];
    var _this = this;
    function reslove(res) {
        if (_this.status !== 'pending') return;
        _this.status = 'fulfilled';
        _this.result = res;
        _this.cb.forEach(item => {
            item.successCB && item.successCB(res);
        });

        // console.log('reslove');
    }
    function reject(res) {
        if (_this.status !== 'pending') return;
        _this.status = 'rejected';
        _this.result = res;
        _this.cb.forEach(item => {
            item.failCB && item.failCB(res);
        });

    }
    executor(reslove, reject);
}

KerwinPromise.prototype.then = function (successCB, failCB) {
    if (this.status === 'fulfilled') {
        successCB && successCB(this.result);
    }
    if (this.status === 'rejected') {
        failCB && failCB(this.result);
    }
    if (this.status === 'pending') {
        this.cb.push({ successCB, failCB });
    }
};