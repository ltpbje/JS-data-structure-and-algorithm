/**
 * KerwinPromise 构造函数
 * @param {Function} executor - 执行器函数，接收两个参数：resolve 和 reject
 */
function KerwinPromise(executor) {
    // 初始化状态为 pending
    this.status = 'pending';
    // 初始化结果为 undefined
    this.result = undefined;
    // 初始化回调数组为空
    this.cb = [];
    // 保存当前实例的引用
    var _this = this;

    /**
     * 成功回调函数
     * @param {*} res - 成功的结果
     */
    function reslove(res) {
        // 如果状态不是 pending，直接返回
        if (_this.status !== 'pending') return;
        // 更新状态为 fulfilled
        _this.status = 'fulfilled';
        // 更新结果
        _this.result = res;
        // 遍历回调数组，执行成功回调
        _this.cb.forEach(item => {
            item.successCB && item.successCB(res);
        });
    }

    /**
     * 失败回调函数
     * @param {*} res - 失败的结果
     */
    function reject(res) {
        // 如果状态不是 pending，直接返回
        if (_this.status !== 'pending') return;
        // 更新状态为 rejected
        _this.status = 'rejected';
        // 更新结果
        _this.result = res;
        // 遍历回调数组，执行失败回调
        _this.cb.forEach(item => {
            item.failCB && item.failCB(res);
        });
    }

    // 执行传入的执行器函数，传入 resolve 和 reject 函数
    executor(reslove, reject);
}

/**
 * then 方法，用于注册成功和失败的回调函数
 * @param {Function} successCB - 成功的回调函数
 * @param {Function} failCB - 失败的回调函数
 * @returns {KerwinPromise} 返回一个新的 KerwinPromise 实例
 */
KerwinPromise.prototype.then = function (successCB, failCB) {
    // 如果没有传入成功回调函数，使用默认的回调函数
    if (!successCB) {
        successCB = value => value;
    }
    // 如果没有传入失败回调函数，使用默认的回调函数
    if (!failCB) {
        failCB = error => error;
    }

    // 返回一个新的 KerwinPromise 实例
    return new KerwinPromise((reslove, reject) => {
        // 如果当前状态为 fulfilled，执行成功回调
        if (this.status === 'fulfilled') {
            // 执行成功回调，获取结果
            var result = successCB && successCB(this.result);
            // 如果结果是一个 KerwinPromise 实例，等待其完成后再执行 resolve 或 reject
            if (result instanceof KerwinPromise) {
                result.then((res) => {
                    reslove(res);
                }, err => {
                    reject(err);
                });
            } else {
                // 如果结果不是一个 KerwinPromise 实例，直接执行 resolve
                reslove(result);
            };
        }

        // 如果当前状态为 rejected，执行失败回调
        if (this.status === 'rejected') {
            // 执行失败回调，获取结果
            var result = failCB && failCB(this.result);
            // 如果结果是一个 KerwinPromise 实例，等待其完成后再执行 resolve 或 reject
            if (result instanceof KerwinPromise) {
                result.then((res) => {
                    reslove(res);
                }, err => {
                    reject(err);
                });
            } else {
                // 如果结果不是一个 KerwinPromise 实例，直接执行 reject
                reject(result);
            };
        }

        // 如果当前状态为 pending，将回调函数添加到回调数组中
        if (this.status === 'pending') {
            this.cb.push({
                successCB: () => {
                    // 执行成功回调，获取结果
                    var result = successCB && successCB(this.result);
                    // 如果结果是一个 KerwinPromise 实例，等待其完成后再执行 resolve 或 reject
                    if (result instanceof KerwinPromise) {
                        result.then((res) => {
                            reslove(res);
                        }, err => {
                            reject(err);
                        });
                    } else {
                        // 如果结果不是一个 KerwinPromise 实例，直接执行 resolve
                        reslove(result);
                    };
                },
                failCB: () => {
                    // 执行失败回调，获取结果
                    var result = failCB && failCB(this.result);
                    // 如果结果是一个 KerwinPromise 实例，等待其完成后再执行 resolve 或 reject
                    if (result instanceof KerwinPromise) {
                        result.then((res) => {
                            reslove(res);
                        }, err => {
                            reject(err);
                        });
                    } else {
                        // 如果结果不是一个 KerwinPromise 实例，直接执行 reject
                        reject(result);
                    };
                }
            });
        }
    });
};

/**
 * catch 方法，用于注册失败的回调函数
 * @param {Function} failCB - 失败的回调函数
 * @returns {KerwinPromise} 返回一个新的 KerwinPromise 实例
 */
KerwinPromise.prototype.catch = function (failCB) {
    // 调用 then 方法，传入 undefined 和失败回调函数
    this.then(undefined, failCB);
};
