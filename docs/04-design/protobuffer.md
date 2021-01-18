# ProtoBuffer

## 目录

* `src/proto-model`用于存放从pb生成的js/ts文件，且不加入git版本控制
* `src/proto`用于存放本项目所需的在pb中定义的类型，简化了命名空间的引用，其他部分统一从该模块引用，方便管理

## 脚本

使用`./scripts/generate_protobuffer.sh`来生成js/ts文件。
默认的pb源文件存放路径为`DIR=src/proto-resources`。

注：由于生成的js/ts不加入版本控制，所以需要自己维护更新。

## 类型引用

在`src/proto/index.ts`中如下定义，并导出类型：

```ts
import { base } from '@/proto-model/base';
import { recipe } from '@/proto-model/procedure';
import { stats } from '@/proto-model/stats';

// interface 用 type
export type RecipeCooking = stats.IRecipeCooking;
export type TimeRange = base.ITimeRange;

// enum 用 const
export const Action = recipe.procedure.Action;
export const OilPumpId = recipe.procedure.OilPumpId;
```

在需要使用地方，如下引用：

```ts
import { DeviceItem, DevItemFilter } from '@/proto';
```
