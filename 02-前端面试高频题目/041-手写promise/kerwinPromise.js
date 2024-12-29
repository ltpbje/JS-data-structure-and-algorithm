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
    if (!successCB) {
        successCB = value => value;
    }
    if (!failCB) {
        failCB = error => error;
    }
    return new KerwinPromise((reslove, reject) => {
        if (this.status === 'fulfilled') {
            var result = successCB && successCB(this.result);
            if (result instanceof KerwinPromise) {
                result.then((res) => {
                    reslove(res);
                }, err => {
                    reject(err);
                });
            } else {
                reslove(result);
            };
        }
        if (this.status === 'rejected') {

            failCB && failCB(this.result);
            var result = failCB && failCB(this.result);
            if (result instanceof KerwinPromise) {
                result.then((res) => {
                    reslove(res);
                }, err => {
                    reject(err);
                });
            } else {
                reject(result);
            };
        }
        if (this.status === 'pending') {
            this.cb.push({
                successCB: () => {
                    var result = successCB && successCB(this.result);
                    if (result instanceof KerwinPromise) {
                        result.then((res) => {
                            reslove(res);
                        }, err => {
                            reject(err);
                        });
                    } else {
                        reslove(result);
                    };
                },
                failCB: () => {
                    var result = failCB && failCB(this.result);
                    if (result instanceof KerwinPromise) {
                        result.then((res) => {
                            reslove(res);
                        }, err => {
                            reject(err);
                        });
                    } else {
                        reject(result);
                    };
                }
            });
        }

    });
};
KerwinPromise.prototype.catch = function (failCB) {
    this.then(undefined, failCB);
};