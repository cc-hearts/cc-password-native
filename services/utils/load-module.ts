// import {readdir} from 'fs/promises';
// import {resolve} from 'path';


// // 递归获取module的路径
// export async function traverseModulePath(path: string): Promise<string[]> {
//   const dirs = await readdir(path, {withFileTypes: true});
//   const task = dirs.map(async dir => {
//     if (dir.isDirectory()) {
//       const modulePath = resolve(path, dir.name);
//       return await traverseModulePath(modulePath);
//     }
//     if (dir.name.includes('.module.')) {
//       return [resolve(path, dir.name)];
//     }
//     return [];
//   });
//   const modulePathList = await Promise.all<Array<string>>(task);
//   return modulePathList.flat();
// }
