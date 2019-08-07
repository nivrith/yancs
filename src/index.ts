/*!
 * yancs <https://github.com/nivrith/yancs>
 *
 * Copyright (c) Nivrith
 * Licensed under the MIT License.
 */

const isGenerator = (fn: any) => ['GeneratorFunction', 'AsyncGeneratorFunction'].includes(fn.constructor.name)
export async function* yancsGen(gen: () => Iterator<any> | AsyncIterator<any> ) {
  let iterator = gen();
  let iteration = await iterator.next();
  while (!iteration.done) {
    let value = iteration.value
    let type = typeof value;
    if( type === 'object' && value['then']  && typeof value.then === 'function') {
      iteration = await iterator.next(await iteration.value);
    }
    else if (isGenerator(value)) {
      iteration = await iterator.next(await (yield* value()));
    }
    else if (type === 'function') {
      iteration = await iterator.next(await iteration.value.call());
    }
    else {
      iteration = await iterator.next(iteration.value);
    }
  }
  return iteration;
};

export default yancs;

export  async function yancs (gen: () => Iterator<any> | AsyncIterator<any>) {
  let asyncIterator = yancsGen(gen);
  let asyncIteration = await asyncIterator.next();
  while (!asyncIteration.done) {
    asyncIteration = await asyncIterator.next(asyncIteration.value);
  }
}