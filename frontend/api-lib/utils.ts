export function patchBigInt() {
  // Monkey patch BigInt toJSON to return a string.
  // https://github.com/GoogleChromeLabs/jsbi/issues/30
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
}
