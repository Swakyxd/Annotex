
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Dataset
 * 
 */
export type Dataset = $Result.DefaultSelection<Prisma.$DatasetPayload>
/**
 * Model DataRecord
 * 
 */
export type DataRecord = $Result.DefaultSelection<Prisma.$DataRecordPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Label
 * 
 */
export type Label = $Result.DefaultSelection<Prisma.$LabelPayload>
/**
 * Model Payout
 * 
 */
export type Payout = $Result.DefaultSelection<Prisma.$PayoutPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dataset`: Exposes CRUD operations for the **Dataset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Datasets
    * const datasets = await prisma.dataset.findMany()
    * ```
    */
  get dataset(): Prisma.DatasetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dataRecord`: Exposes CRUD operations for the **DataRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DataRecords
    * const dataRecords = await prisma.dataRecord.findMany()
    * ```
    */
  get dataRecord(): Prisma.DataRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.label`: Exposes CRUD operations for the **Label** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Labels
    * const labels = await prisma.label.findMany()
    * ```
    */
  get label(): Prisma.LabelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payout`: Exposes CRUD operations for the **Payout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payouts
    * const payouts = await prisma.payout.findMany()
    * ```
    */
  get payout(): Prisma.PayoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Dataset: 'Dataset',
    DataRecord: 'DataRecord',
    Task: 'Task',
    Label: 'Label',
    Payout: 'Payout',
    Transaction: 'Transaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "dataset" | "dataRecord" | "task" | "label" | "payout" | "transaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Dataset: {
        payload: Prisma.$DatasetPayload<ExtArgs>
        fields: Prisma.DatasetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DatasetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DatasetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          findFirst: {
            args: Prisma.DatasetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DatasetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          findMany: {
            args: Prisma.DatasetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>[]
          }
          create: {
            args: Prisma.DatasetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          createMany: {
            args: Prisma.DatasetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DatasetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>[]
          }
          delete: {
            args: Prisma.DatasetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          update: {
            args: Prisma.DatasetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          deleteMany: {
            args: Prisma.DatasetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DatasetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DatasetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>[]
          }
          upsert: {
            args: Prisma.DatasetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasetPayload>
          }
          aggregate: {
            args: Prisma.DatasetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDataset>
          }
          groupBy: {
            args: Prisma.DatasetGroupByArgs<ExtArgs>
            result: $Utils.Optional<DatasetGroupByOutputType>[]
          }
          count: {
            args: Prisma.DatasetCountArgs<ExtArgs>
            result: $Utils.Optional<DatasetCountAggregateOutputType> | number
          }
        }
      }
      DataRecord: {
        payload: Prisma.$DataRecordPayload<ExtArgs>
        fields: Prisma.DataRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DataRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DataRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload>
          }
          findFirst: {
            args: Prisma.DataRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DataRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload>
          }
          findMany: {
            args: Prisma.DataRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload>[]
          }
          create: {
            args: Prisma.DataRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload>
          }
          createMany: {
            args: Prisma.DataRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DataRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload>[]
          }
          delete: {
            args: Prisma.DataRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload>
          }
          update: {
            args: Prisma.DataRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload>
          }
          deleteMany: {
            args: Prisma.DataRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DataRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DataRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload>[]
          }
          upsert: {
            args: Prisma.DataRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DataRecordPayload>
          }
          aggregate: {
            args: Prisma.DataRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDataRecord>
          }
          groupBy: {
            args: Prisma.DataRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<DataRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.DataRecordCountArgs<ExtArgs>
            result: $Utils.Optional<DataRecordCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Label: {
        payload: Prisma.$LabelPayload<ExtArgs>
        fields: Prisma.LabelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LabelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LabelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          findFirst: {
            args: Prisma.LabelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LabelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          findMany: {
            args: Prisma.LabelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>[]
          }
          create: {
            args: Prisma.LabelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          createMany: {
            args: Prisma.LabelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LabelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>[]
          }
          delete: {
            args: Prisma.LabelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          update: {
            args: Prisma.LabelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          deleteMany: {
            args: Prisma.LabelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LabelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LabelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>[]
          }
          upsert: {
            args: Prisma.LabelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabelPayload>
          }
          aggregate: {
            args: Prisma.LabelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLabel>
          }
          groupBy: {
            args: Prisma.LabelGroupByArgs<ExtArgs>
            result: $Utils.Optional<LabelGroupByOutputType>[]
          }
          count: {
            args: Prisma.LabelCountArgs<ExtArgs>
            result: $Utils.Optional<LabelCountAggregateOutputType> | number
          }
        }
      }
      Payout: {
        payload: Prisma.$PayoutPayload<ExtArgs>
        fields: Prisma.PayoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          findFirst: {
            args: Prisma.PayoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          findMany: {
            args: Prisma.PayoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          create: {
            args: Prisma.PayoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          createMany: {
            args: Prisma.PayoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          delete: {
            args: Prisma.PayoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          update: {
            args: Prisma.PayoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          deleteMany: {
            args: Prisma.PayoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PayoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          upsert: {
            args: Prisma.PayoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          aggregate: {
            args: Prisma.PayoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayout>
          }
          groupBy: {
            args: Prisma.PayoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayoutCountArgs<ExtArgs>
            result: $Utils.Optional<PayoutCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    dataset?: DatasetOmit
    dataRecord?: DataRecordOmit
    task?: TaskOmit
    label?: LabelOmit
    payout?: PayoutOmit
    transaction?: TransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tasks: number
    datasets: number
    labels: number
    payouts: number
    transactions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    datasets?: boolean | UserCountOutputTypeCountDatasetsArgs
    labels?: boolean | UserCountOutputTypeCountLabelsArgs
    payouts?: boolean | UserCountOutputTypeCountPayoutsArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDatasetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DatasetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLabelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabelWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPayoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type DatasetCountOutputType
   */

  export type DatasetCountOutputType = {
    tasks: number
    records: number
    payouts: number
  }

  export type DatasetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | DatasetCountOutputTypeCountTasksArgs
    records?: boolean | DatasetCountOutputTypeCountRecordsArgs
    payouts?: boolean | DatasetCountOutputTypeCountPayoutsArgs
  }

  // Custom InputTypes
  /**
   * DatasetCountOutputType without action
   */
  export type DatasetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatasetCountOutputType
     */
    select?: DatasetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DatasetCountOutputType without action
   */
  export type DatasetCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * DatasetCountOutputType without action
   */
  export type DatasetCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DataRecordWhereInput
  }

  /**
   * DatasetCountOutputType without action
   */
  export type DatasetCountOutputTypeCountPayoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutWhereInput
  }


  /**
   * Count Type DataRecordCountOutputType
   */

  export type DataRecordCountOutputType = {
    tasks: number
    labels: number
  }

  export type DataRecordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | DataRecordCountOutputTypeCountTasksArgs
    labels?: boolean | DataRecordCountOutputTypeCountLabelsArgs
  }

  // Custom InputTypes
  /**
   * DataRecordCountOutputType without action
   */
  export type DataRecordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecordCountOutputType
     */
    select?: DataRecordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DataRecordCountOutputType without action
   */
  export type DataRecordCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * DataRecordCountOutputType without action
   */
  export type DataRecordCountOutputTypeCountLabelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabelWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    labels: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    labels?: boolean | TaskCountOutputTypeCountLabelsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountLabelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabelWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    totalEarnings: number | null
    tasksCompleted: number | null
    accuracyRate: number | null
  }

  export type UserSumAggregateOutputType = {
    totalEarnings: number | null
    tasksCompleted: number | null
    accuracyRate: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    role: string | null
    walletAddress: string | null
    isActive: boolean | null
    totalEarnings: number | null
    tasksCompleted: number | null
    accuracyRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    role: string | null
    walletAddress: string | null
    isActive: boolean | null
    totalEarnings: number | null
    tasksCompleted: number | null
    accuracyRate: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    role: number
    walletAddress: number
    isActive: number
    totalEarnings: number
    tasksCompleted: number
    accuracyRate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    totalEarnings?: true
    tasksCompleted?: true
    accuracyRate?: true
  }

  export type UserSumAggregateInputType = {
    totalEarnings?: true
    tasksCompleted?: true
    accuracyRate?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    role?: true
    walletAddress?: true
    isActive?: true
    totalEarnings?: true
    tasksCompleted?: true
    accuracyRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    role?: true
    walletAddress?: true
    isActive?: true
    totalEarnings?: true
    tasksCompleted?: true
    accuracyRate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    role?: true
    walletAddress?: true
    isActive?: true
    totalEarnings?: true
    tasksCompleted?: true
    accuracyRate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    walletAddress: string | null
    isActive: boolean
    totalEarnings: number
    tasksCompleted: number
    accuracyRate: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    walletAddress?: boolean
    isActive?: boolean
    totalEarnings?: boolean
    tasksCompleted?: boolean
    accuracyRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tasks?: boolean | User$tasksArgs<ExtArgs>
    datasets?: boolean | User$datasetsArgs<ExtArgs>
    labels?: boolean | User$labelsArgs<ExtArgs>
    payouts?: boolean | User$payoutsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    walletAddress?: boolean
    isActive?: boolean
    totalEarnings?: boolean
    tasksCompleted?: boolean
    accuracyRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    walletAddress?: boolean
    isActive?: boolean
    totalEarnings?: boolean
    tasksCompleted?: boolean
    accuracyRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    walletAddress?: boolean
    isActive?: boolean
    totalEarnings?: boolean
    tasksCompleted?: boolean
    accuracyRate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "role" | "walletAddress" | "isActive" | "totalEarnings" | "tasksCompleted" | "accuracyRate" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | User$tasksArgs<ExtArgs>
    datasets?: boolean | User$datasetsArgs<ExtArgs>
    labels?: boolean | User$labelsArgs<ExtArgs>
    payouts?: boolean | User$payoutsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      datasets: Prisma.$DatasetPayload<ExtArgs>[]
      labels: Prisma.$LabelPayload<ExtArgs>[]
      payouts: Prisma.$PayoutPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      firstName: string
      lastName: string
      role: string
      walletAddress: string | null
      isActive: boolean
      totalEarnings: number
      tasksCompleted: number
      accuracyRate: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    datasets<T extends User$datasetsArgs<ExtArgs> = {}>(args?: Subset<T, User$datasetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    labels<T extends User$labelsArgs<ExtArgs> = {}>(args?: Subset<T, User$labelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payouts<T extends User$payoutsArgs<ExtArgs> = {}>(args?: Subset<T, User$payoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly totalEarnings: FieldRef<"User", 'Float'>
    readonly tasksCompleted: FieldRef<"User", 'Int'>
    readonly accuracyRate: FieldRef<"User", 'Float'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.datasets
   */
  export type User$datasetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    where?: DatasetWhereInput
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    cursor?: DatasetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * User.labels
   */
  export type User$labelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    where?: LabelWhereInput
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    cursor?: LabelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LabelScalarFieldEnum | LabelScalarFieldEnum[]
  }

  /**
   * User.payouts
   */
  export type User$payoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    where?: PayoutWhereInput
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    cursor?: PayoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Dataset
   */

  export type AggregateDataset = {
    _count: DatasetCountAggregateOutputType | null
    _avg: DatasetAvgAggregateOutputType | null
    _sum: DatasetSumAggregateOutputType | null
    _min: DatasetMinAggregateOutputType | null
    _max: DatasetMaxAggregateOutputType | null
  }

  export type DatasetAvgAggregateOutputType = {
    totalRecords: number | null
    labeledRecords: number | null
    totalRewardSOL: number | null
    rewardPerRecord: number | null
    maxLabelsPerRecord: number | null
    consensusThreshold: number | null
  }

  export type DatasetSumAggregateOutputType = {
    totalRecords: number | null
    labeledRecords: number | null
    totalRewardSOL: number | null
    rewardPerRecord: number | null
    maxLabelsPerRecord: number | null
    consensusThreshold: number | null
  }

  export type DatasetMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    format: string | null
    filePath: string | null
    totalRecords: number | null
    labeledRecords: number | null
    labelType: string | null
    totalRewardSOL: number | null
    rewardPerRecord: number | null
    maxLabelsPerRecord: number | null
    consensusThreshold: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type DatasetMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    format: string | null
    filePath: string | null
    totalRecords: number | null
    labeledRecords: number | null
    labelType: string | null
    totalRewardSOL: number | null
    rewardPerRecord: number | null
    maxLabelsPerRecord: number | null
    consensusThreshold: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type DatasetCountAggregateOutputType = {
    id: number
    name: number
    description: number
    format: number
    filePath: number
    totalRecords: number
    labeledRecords: number
    labelType: number
    labelOptions: number
    labelSchema: number
    totalRewardSOL: number
    rewardPerRecord: number
    maxLabelsPerRecord: number
    consensusThreshold: number
    schema: number
    validationRules: number
    isActive: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type DatasetAvgAggregateInputType = {
    totalRecords?: true
    labeledRecords?: true
    totalRewardSOL?: true
    rewardPerRecord?: true
    maxLabelsPerRecord?: true
    consensusThreshold?: true
  }

  export type DatasetSumAggregateInputType = {
    totalRecords?: true
    labeledRecords?: true
    totalRewardSOL?: true
    rewardPerRecord?: true
    maxLabelsPerRecord?: true
    consensusThreshold?: true
  }

  export type DatasetMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    format?: true
    filePath?: true
    totalRecords?: true
    labeledRecords?: true
    labelType?: true
    totalRewardSOL?: true
    rewardPerRecord?: true
    maxLabelsPerRecord?: true
    consensusThreshold?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type DatasetMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    format?: true
    filePath?: true
    totalRecords?: true
    labeledRecords?: true
    labelType?: true
    totalRewardSOL?: true
    rewardPerRecord?: true
    maxLabelsPerRecord?: true
    consensusThreshold?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type DatasetCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    format?: true
    filePath?: true
    totalRecords?: true
    labeledRecords?: true
    labelType?: true
    labelOptions?: true
    labelSchema?: true
    totalRewardSOL?: true
    rewardPerRecord?: true
    maxLabelsPerRecord?: true
    consensusThreshold?: true
    schema?: true
    validationRules?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type DatasetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dataset to aggregate.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Datasets
    **/
    _count?: true | DatasetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DatasetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DatasetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DatasetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DatasetMaxAggregateInputType
  }

  export type GetDatasetAggregateType<T extends DatasetAggregateArgs> = {
        [P in keyof T & keyof AggregateDataset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataset[P]>
      : GetScalarType<T[P], AggregateDataset[P]>
  }




  export type DatasetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DatasetWhereInput
    orderBy?: DatasetOrderByWithAggregationInput | DatasetOrderByWithAggregationInput[]
    by: DatasetScalarFieldEnum[] | DatasetScalarFieldEnum
    having?: DatasetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DatasetCountAggregateInputType | true
    _avg?: DatasetAvgAggregateInputType
    _sum?: DatasetSumAggregateInputType
    _min?: DatasetMinAggregateInputType
    _max?: DatasetMaxAggregateInputType
  }

  export type DatasetGroupByOutputType = {
    id: string
    name: string
    description: string | null
    format: string
    filePath: string
    totalRecords: number
    labeledRecords: number
    labelType: string
    labelOptions: JsonValue | null
    labelSchema: JsonValue | null
    totalRewardSOL: number
    rewardPerRecord: number
    maxLabelsPerRecord: number
    consensusThreshold: number
    schema: JsonValue | null
    validationRules: JsonValue | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    createdById: string
    _count: DatasetCountAggregateOutputType | null
    _avg: DatasetAvgAggregateOutputType | null
    _sum: DatasetSumAggregateOutputType | null
    _min: DatasetMinAggregateOutputType | null
    _max: DatasetMaxAggregateOutputType | null
  }

  type GetDatasetGroupByPayload<T extends DatasetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DatasetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DatasetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DatasetGroupByOutputType[P]>
            : GetScalarType<T[P], DatasetGroupByOutputType[P]>
        }
      >
    >


  export type DatasetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    format?: boolean
    filePath?: boolean
    totalRecords?: boolean
    labeledRecords?: boolean
    labelType?: boolean
    labelOptions?: boolean
    labelSchema?: boolean
    totalRewardSOL?: boolean
    rewardPerRecord?: boolean
    maxLabelsPerRecord?: boolean
    consensusThreshold?: boolean
    schema?: boolean
    validationRules?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | Dataset$tasksArgs<ExtArgs>
    records?: boolean | Dataset$recordsArgs<ExtArgs>
    payouts?: boolean | Dataset$payoutsArgs<ExtArgs>
    _count?: boolean | DatasetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataset"]>

  export type DatasetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    format?: boolean
    filePath?: boolean
    totalRecords?: boolean
    labeledRecords?: boolean
    labelType?: boolean
    labelOptions?: boolean
    labelSchema?: boolean
    totalRewardSOL?: boolean
    rewardPerRecord?: boolean
    maxLabelsPerRecord?: boolean
    consensusThreshold?: boolean
    schema?: boolean
    validationRules?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataset"]>

  export type DatasetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    format?: boolean
    filePath?: boolean
    totalRecords?: boolean
    labeledRecords?: boolean
    labelType?: boolean
    labelOptions?: boolean
    labelSchema?: boolean
    totalRewardSOL?: boolean
    rewardPerRecord?: boolean
    maxLabelsPerRecord?: boolean
    consensusThreshold?: boolean
    schema?: boolean
    validationRules?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataset"]>

  export type DatasetSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    format?: boolean
    filePath?: boolean
    totalRecords?: boolean
    labeledRecords?: boolean
    labelType?: boolean
    labelOptions?: boolean
    labelSchema?: boolean
    totalRewardSOL?: boolean
    rewardPerRecord?: boolean
    maxLabelsPerRecord?: boolean
    consensusThreshold?: boolean
    schema?: boolean
    validationRules?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type DatasetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "format" | "filePath" | "totalRecords" | "labeledRecords" | "labelType" | "labelOptions" | "labelSchema" | "totalRewardSOL" | "rewardPerRecord" | "maxLabelsPerRecord" | "consensusThreshold" | "schema" | "validationRules" | "isActive" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["dataset"]>
  export type DatasetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | Dataset$tasksArgs<ExtArgs>
    records?: boolean | Dataset$recordsArgs<ExtArgs>
    payouts?: boolean | Dataset$payoutsArgs<ExtArgs>
    _count?: boolean | DatasetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DatasetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DatasetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DatasetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dataset"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      records: Prisma.$DataRecordPayload<ExtArgs>[]
      payouts: Prisma.$PayoutPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      format: string
      filePath: string
      totalRecords: number
      labeledRecords: number
      labelType: string
      labelOptions: Prisma.JsonValue | null
      labelSchema: Prisma.JsonValue | null
      totalRewardSOL: number
      rewardPerRecord: number
      maxLabelsPerRecord: number
      consensusThreshold: number
      schema: Prisma.JsonValue | null
      validationRules: Prisma.JsonValue | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      createdById: string
    }, ExtArgs["result"]["dataset"]>
    composites: {}
  }

  type DatasetGetPayload<S extends boolean | null | undefined | DatasetDefaultArgs> = $Result.GetResult<Prisma.$DatasetPayload, S>

  type DatasetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DatasetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DatasetCountAggregateInputType | true
    }

  export interface DatasetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dataset'], meta: { name: 'Dataset' } }
    /**
     * Find zero or one Dataset that matches the filter.
     * @param {DatasetFindUniqueArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DatasetFindUniqueArgs>(args: SelectSubset<T, DatasetFindUniqueArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dataset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DatasetFindUniqueOrThrowArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DatasetFindUniqueOrThrowArgs>(args: SelectSubset<T, DatasetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dataset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetFindFirstArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DatasetFindFirstArgs>(args?: SelectSubset<T, DatasetFindFirstArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dataset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetFindFirstOrThrowArgs} args - Arguments to find a Dataset
     * @example
     * // Get one Dataset
     * const dataset = await prisma.dataset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DatasetFindFirstOrThrowArgs>(args?: SelectSubset<T, DatasetFindFirstOrThrowArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Datasets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Datasets
     * const datasets = await prisma.dataset.findMany()
     * 
     * // Get first 10 Datasets
     * const datasets = await prisma.dataset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const datasetWithIdOnly = await prisma.dataset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DatasetFindManyArgs>(args?: SelectSubset<T, DatasetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dataset.
     * @param {DatasetCreateArgs} args - Arguments to create a Dataset.
     * @example
     * // Create one Dataset
     * const Dataset = await prisma.dataset.create({
     *   data: {
     *     // ... data to create a Dataset
     *   }
     * })
     * 
     */
    create<T extends DatasetCreateArgs>(args: SelectSubset<T, DatasetCreateArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Datasets.
     * @param {DatasetCreateManyArgs} args - Arguments to create many Datasets.
     * @example
     * // Create many Datasets
     * const dataset = await prisma.dataset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DatasetCreateManyArgs>(args?: SelectSubset<T, DatasetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Datasets and returns the data saved in the database.
     * @param {DatasetCreateManyAndReturnArgs} args - Arguments to create many Datasets.
     * @example
     * // Create many Datasets
     * const dataset = await prisma.dataset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Datasets and only return the `id`
     * const datasetWithIdOnly = await prisma.dataset.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DatasetCreateManyAndReturnArgs>(args?: SelectSubset<T, DatasetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dataset.
     * @param {DatasetDeleteArgs} args - Arguments to delete one Dataset.
     * @example
     * // Delete one Dataset
     * const Dataset = await prisma.dataset.delete({
     *   where: {
     *     // ... filter to delete one Dataset
     *   }
     * })
     * 
     */
    delete<T extends DatasetDeleteArgs>(args: SelectSubset<T, DatasetDeleteArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dataset.
     * @param {DatasetUpdateArgs} args - Arguments to update one Dataset.
     * @example
     * // Update one Dataset
     * const dataset = await prisma.dataset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DatasetUpdateArgs>(args: SelectSubset<T, DatasetUpdateArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Datasets.
     * @param {DatasetDeleteManyArgs} args - Arguments to filter Datasets to delete.
     * @example
     * // Delete a few Datasets
     * const { count } = await prisma.dataset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DatasetDeleteManyArgs>(args?: SelectSubset<T, DatasetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Datasets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Datasets
     * const dataset = await prisma.dataset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DatasetUpdateManyArgs>(args: SelectSubset<T, DatasetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Datasets and returns the data updated in the database.
     * @param {DatasetUpdateManyAndReturnArgs} args - Arguments to update many Datasets.
     * @example
     * // Update many Datasets
     * const dataset = await prisma.dataset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Datasets and only return the `id`
     * const datasetWithIdOnly = await prisma.dataset.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DatasetUpdateManyAndReturnArgs>(args: SelectSubset<T, DatasetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dataset.
     * @param {DatasetUpsertArgs} args - Arguments to update or create a Dataset.
     * @example
     * // Update or create a Dataset
     * const dataset = await prisma.dataset.upsert({
     *   create: {
     *     // ... data to create a Dataset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dataset we want to update
     *   }
     * })
     */
    upsert<T extends DatasetUpsertArgs>(args: SelectSubset<T, DatasetUpsertArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Datasets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetCountArgs} args - Arguments to filter Datasets to count.
     * @example
     * // Count the number of Datasets
     * const count = await prisma.dataset.count({
     *   where: {
     *     // ... the filter for the Datasets we want to count
     *   }
     * })
    **/
    count<T extends DatasetCountArgs>(
      args?: Subset<T, DatasetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DatasetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dataset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DatasetAggregateArgs>(args: Subset<T, DatasetAggregateArgs>): Prisma.PrismaPromise<GetDatasetAggregateType<T>>

    /**
     * Group by Dataset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatasetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DatasetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DatasetGroupByArgs['orderBy'] }
        : { orderBy?: DatasetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DatasetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDatasetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dataset model
   */
  readonly fields: DatasetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dataset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DatasetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends Dataset$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Dataset$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    records<T extends Dataset$recordsArgs<ExtArgs> = {}>(args?: Subset<T, Dataset$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payouts<T extends Dataset$payoutsArgs<ExtArgs> = {}>(args?: Subset<T, Dataset$payoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dataset model
   */
  interface DatasetFieldRefs {
    readonly id: FieldRef<"Dataset", 'String'>
    readonly name: FieldRef<"Dataset", 'String'>
    readonly description: FieldRef<"Dataset", 'String'>
    readonly format: FieldRef<"Dataset", 'String'>
    readonly filePath: FieldRef<"Dataset", 'String'>
    readonly totalRecords: FieldRef<"Dataset", 'Int'>
    readonly labeledRecords: FieldRef<"Dataset", 'Int'>
    readonly labelType: FieldRef<"Dataset", 'String'>
    readonly labelOptions: FieldRef<"Dataset", 'Json'>
    readonly labelSchema: FieldRef<"Dataset", 'Json'>
    readonly totalRewardSOL: FieldRef<"Dataset", 'Float'>
    readonly rewardPerRecord: FieldRef<"Dataset", 'Float'>
    readonly maxLabelsPerRecord: FieldRef<"Dataset", 'Int'>
    readonly consensusThreshold: FieldRef<"Dataset", 'Float'>
    readonly schema: FieldRef<"Dataset", 'Json'>
    readonly validationRules: FieldRef<"Dataset", 'Json'>
    readonly isActive: FieldRef<"Dataset", 'Boolean'>
    readonly createdAt: FieldRef<"Dataset", 'DateTime'>
    readonly updatedAt: FieldRef<"Dataset", 'DateTime'>
    readonly createdById: FieldRef<"Dataset", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Dataset findUnique
   */
  export type DatasetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset findUniqueOrThrow
   */
  export type DatasetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset findFirst
   */
  export type DatasetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Datasets.
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Datasets.
     */
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * Dataset findFirstOrThrow
   */
  export type DatasetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Dataset to fetch.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Datasets.
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Datasets.
     */
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * Dataset findMany
   */
  export type DatasetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter, which Datasets to fetch.
     */
    where?: DatasetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datasets to fetch.
     */
    orderBy?: DatasetOrderByWithRelationInput | DatasetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Datasets.
     */
    cursor?: DatasetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datasets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datasets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Datasets.
     */
    distinct?: DatasetScalarFieldEnum | DatasetScalarFieldEnum[]
  }

  /**
   * Dataset create
   */
  export type DatasetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * The data needed to create a Dataset.
     */
    data: XOR<DatasetCreateInput, DatasetUncheckedCreateInput>
  }

  /**
   * Dataset createMany
   */
  export type DatasetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Datasets.
     */
    data: DatasetCreateManyInput | DatasetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dataset createManyAndReturn
   */
  export type DatasetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * The data used to create many Datasets.
     */
    data: DatasetCreateManyInput | DatasetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dataset update
   */
  export type DatasetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * The data needed to update a Dataset.
     */
    data: XOR<DatasetUpdateInput, DatasetUncheckedUpdateInput>
    /**
     * Choose, which Dataset to update.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset updateMany
   */
  export type DatasetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Datasets.
     */
    data: XOR<DatasetUpdateManyMutationInput, DatasetUncheckedUpdateManyInput>
    /**
     * Filter which Datasets to update
     */
    where?: DatasetWhereInput
    /**
     * Limit how many Datasets to update.
     */
    limit?: number
  }

  /**
   * Dataset updateManyAndReturn
   */
  export type DatasetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * The data used to update Datasets.
     */
    data: XOR<DatasetUpdateManyMutationInput, DatasetUncheckedUpdateManyInput>
    /**
     * Filter which Datasets to update
     */
    where?: DatasetWhereInput
    /**
     * Limit how many Datasets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dataset upsert
   */
  export type DatasetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * The filter to search for the Dataset to update in case it exists.
     */
    where: DatasetWhereUniqueInput
    /**
     * In case the Dataset found by the `where` argument doesn't exist, create a new Dataset with this data.
     */
    create: XOR<DatasetCreateInput, DatasetUncheckedCreateInput>
    /**
     * In case the Dataset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DatasetUpdateInput, DatasetUncheckedUpdateInput>
  }

  /**
   * Dataset delete
   */
  export type DatasetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
    /**
     * Filter which Dataset to delete.
     */
    where: DatasetWhereUniqueInput
  }

  /**
   * Dataset deleteMany
   */
  export type DatasetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Datasets to delete
     */
    where?: DatasetWhereInput
    /**
     * Limit how many Datasets to delete.
     */
    limit?: number
  }

  /**
   * Dataset.tasks
   */
  export type Dataset$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Dataset.records
   */
  export type Dataset$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    where?: DataRecordWhereInput
    orderBy?: DataRecordOrderByWithRelationInput | DataRecordOrderByWithRelationInput[]
    cursor?: DataRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DataRecordScalarFieldEnum | DataRecordScalarFieldEnum[]
  }

  /**
   * Dataset.payouts
   */
  export type Dataset$payoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    where?: PayoutWhereInput
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    cursor?: PayoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Dataset without action
   */
  export type DatasetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dataset
     */
    select?: DatasetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dataset
     */
    omit?: DatasetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatasetInclude<ExtArgs> | null
  }


  /**
   * Model DataRecord
   */

  export type AggregateDataRecord = {
    _count: DataRecordCountAggregateOutputType | null
    _avg: DataRecordAvgAggregateOutputType | null
    _sum: DataRecordSumAggregateOutputType | null
    _min: DataRecordMinAggregateOutputType | null
    _max: DataRecordMaxAggregateOutputType | null
  }

  export type DataRecordAvgAggregateOutputType = {
    recordNumber: number | null
  }

  export type DataRecordSumAggregateOutputType = {
    recordNumber: number | null
  }

  export type DataRecordMinAggregateOutputType = {
    id: string | null
    recordNumber: number | null
    isLabeled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    datasetId: string | null
  }

  export type DataRecordMaxAggregateOutputType = {
    id: string | null
    recordNumber: number | null
    isLabeled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    datasetId: string | null
  }

  export type DataRecordCountAggregateOutputType = {
    id: number
    recordNumber: number
    rawData: number
    isLabeled: number
    createdAt: number
    updatedAt: number
    datasetId: number
    _all: number
  }


  export type DataRecordAvgAggregateInputType = {
    recordNumber?: true
  }

  export type DataRecordSumAggregateInputType = {
    recordNumber?: true
  }

  export type DataRecordMinAggregateInputType = {
    id?: true
    recordNumber?: true
    isLabeled?: true
    createdAt?: true
    updatedAt?: true
    datasetId?: true
  }

  export type DataRecordMaxAggregateInputType = {
    id?: true
    recordNumber?: true
    isLabeled?: true
    createdAt?: true
    updatedAt?: true
    datasetId?: true
  }

  export type DataRecordCountAggregateInputType = {
    id?: true
    recordNumber?: true
    rawData?: true
    isLabeled?: true
    createdAt?: true
    updatedAt?: true
    datasetId?: true
    _all?: true
  }

  export type DataRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataRecord to aggregate.
     */
    where?: DataRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataRecords to fetch.
     */
    orderBy?: DataRecordOrderByWithRelationInput | DataRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DataRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DataRecords
    **/
    _count?: true | DataRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DataRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DataRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DataRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DataRecordMaxAggregateInputType
  }

  export type GetDataRecordAggregateType<T extends DataRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateDataRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDataRecord[P]>
      : GetScalarType<T[P], AggregateDataRecord[P]>
  }




  export type DataRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DataRecordWhereInput
    orderBy?: DataRecordOrderByWithAggregationInput | DataRecordOrderByWithAggregationInput[]
    by: DataRecordScalarFieldEnum[] | DataRecordScalarFieldEnum
    having?: DataRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DataRecordCountAggregateInputType | true
    _avg?: DataRecordAvgAggregateInputType
    _sum?: DataRecordSumAggregateInputType
    _min?: DataRecordMinAggregateInputType
    _max?: DataRecordMaxAggregateInputType
  }

  export type DataRecordGroupByOutputType = {
    id: string
    recordNumber: number
    rawData: JsonValue
    isLabeled: boolean
    createdAt: Date
    updatedAt: Date
    datasetId: string
    _count: DataRecordCountAggregateOutputType | null
    _avg: DataRecordAvgAggregateOutputType | null
    _sum: DataRecordSumAggregateOutputType | null
    _min: DataRecordMinAggregateOutputType | null
    _max: DataRecordMaxAggregateOutputType | null
  }

  type GetDataRecordGroupByPayload<T extends DataRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DataRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DataRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DataRecordGroupByOutputType[P]>
            : GetScalarType<T[P], DataRecordGroupByOutputType[P]>
        }
      >
    >


  export type DataRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordNumber?: boolean
    rawData?: boolean
    isLabeled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    datasetId?: boolean
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    tasks?: boolean | DataRecord$tasksArgs<ExtArgs>
    labels?: boolean | DataRecord$labelsArgs<ExtArgs>
    _count?: boolean | DataRecordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataRecord"]>

  export type DataRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordNumber?: boolean
    rawData?: boolean
    isLabeled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    datasetId?: boolean
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataRecord"]>

  export type DataRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordNumber?: boolean
    rawData?: boolean
    isLabeled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    datasetId?: boolean
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dataRecord"]>

  export type DataRecordSelectScalar = {
    id?: boolean
    recordNumber?: boolean
    rawData?: boolean
    isLabeled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    datasetId?: boolean
  }

  export type DataRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "recordNumber" | "rawData" | "isLabeled" | "createdAt" | "updatedAt" | "datasetId", ExtArgs["result"]["dataRecord"]>
  export type DataRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    tasks?: boolean | DataRecord$tasksArgs<ExtArgs>
    labels?: boolean | DataRecord$labelsArgs<ExtArgs>
    _count?: boolean | DataRecordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DataRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
  }
  export type DataRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
  }

  export type $DataRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DataRecord"
    objects: {
      dataset: Prisma.$DatasetPayload<ExtArgs>
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      labels: Prisma.$LabelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      recordNumber: number
      rawData: Prisma.JsonValue
      isLabeled: boolean
      createdAt: Date
      updatedAt: Date
      datasetId: string
    }, ExtArgs["result"]["dataRecord"]>
    composites: {}
  }

  type DataRecordGetPayload<S extends boolean | null | undefined | DataRecordDefaultArgs> = $Result.GetResult<Prisma.$DataRecordPayload, S>

  type DataRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DataRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DataRecordCountAggregateInputType | true
    }

  export interface DataRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DataRecord'], meta: { name: 'DataRecord' } }
    /**
     * Find zero or one DataRecord that matches the filter.
     * @param {DataRecordFindUniqueArgs} args - Arguments to find a DataRecord
     * @example
     * // Get one DataRecord
     * const dataRecord = await prisma.dataRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DataRecordFindUniqueArgs>(args: SelectSubset<T, DataRecordFindUniqueArgs<ExtArgs>>): Prisma__DataRecordClient<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DataRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DataRecordFindUniqueOrThrowArgs} args - Arguments to find a DataRecord
     * @example
     * // Get one DataRecord
     * const dataRecord = await prisma.dataRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DataRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, DataRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DataRecordClient<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataRecordFindFirstArgs} args - Arguments to find a DataRecord
     * @example
     * // Get one DataRecord
     * const dataRecord = await prisma.dataRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DataRecordFindFirstArgs>(args?: SelectSubset<T, DataRecordFindFirstArgs<ExtArgs>>): Prisma__DataRecordClient<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DataRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataRecordFindFirstOrThrowArgs} args - Arguments to find a DataRecord
     * @example
     * // Get one DataRecord
     * const dataRecord = await prisma.dataRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DataRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, DataRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__DataRecordClient<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DataRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DataRecords
     * const dataRecords = await prisma.dataRecord.findMany()
     * 
     * // Get first 10 DataRecords
     * const dataRecords = await prisma.dataRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dataRecordWithIdOnly = await prisma.dataRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DataRecordFindManyArgs>(args?: SelectSubset<T, DataRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DataRecord.
     * @param {DataRecordCreateArgs} args - Arguments to create a DataRecord.
     * @example
     * // Create one DataRecord
     * const DataRecord = await prisma.dataRecord.create({
     *   data: {
     *     // ... data to create a DataRecord
     *   }
     * })
     * 
     */
    create<T extends DataRecordCreateArgs>(args: SelectSubset<T, DataRecordCreateArgs<ExtArgs>>): Prisma__DataRecordClient<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DataRecords.
     * @param {DataRecordCreateManyArgs} args - Arguments to create many DataRecords.
     * @example
     * // Create many DataRecords
     * const dataRecord = await prisma.dataRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DataRecordCreateManyArgs>(args?: SelectSubset<T, DataRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DataRecords and returns the data saved in the database.
     * @param {DataRecordCreateManyAndReturnArgs} args - Arguments to create many DataRecords.
     * @example
     * // Create many DataRecords
     * const dataRecord = await prisma.dataRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DataRecords and only return the `id`
     * const dataRecordWithIdOnly = await prisma.dataRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DataRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, DataRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DataRecord.
     * @param {DataRecordDeleteArgs} args - Arguments to delete one DataRecord.
     * @example
     * // Delete one DataRecord
     * const DataRecord = await prisma.dataRecord.delete({
     *   where: {
     *     // ... filter to delete one DataRecord
     *   }
     * })
     * 
     */
    delete<T extends DataRecordDeleteArgs>(args: SelectSubset<T, DataRecordDeleteArgs<ExtArgs>>): Prisma__DataRecordClient<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DataRecord.
     * @param {DataRecordUpdateArgs} args - Arguments to update one DataRecord.
     * @example
     * // Update one DataRecord
     * const dataRecord = await prisma.dataRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DataRecordUpdateArgs>(args: SelectSubset<T, DataRecordUpdateArgs<ExtArgs>>): Prisma__DataRecordClient<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DataRecords.
     * @param {DataRecordDeleteManyArgs} args - Arguments to filter DataRecords to delete.
     * @example
     * // Delete a few DataRecords
     * const { count } = await prisma.dataRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DataRecordDeleteManyArgs>(args?: SelectSubset<T, DataRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DataRecords
     * const dataRecord = await prisma.dataRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DataRecordUpdateManyArgs>(args: SelectSubset<T, DataRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DataRecords and returns the data updated in the database.
     * @param {DataRecordUpdateManyAndReturnArgs} args - Arguments to update many DataRecords.
     * @example
     * // Update many DataRecords
     * const dataRecord = await prisma.dataRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DataRecords and only return the `id`
     * const dataRecordWithIdOnly = await prisma.dataRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DataRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, DataRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DataRecord.
     * @param {DataRecordUpsertArgs} args - Arguments to update or create a DataRecord.
     * @example
     * // Update or create a DataRecord
     * const dataRecord = await prisma.dataRecord.upsert({
     *   create: {
     *     // ... data to create a DataRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DataRecord we want to update
     *   }
     * })
     */
    upsert<T extends DataRecordUpsertArgs>(args: SelectSubset<T, DataRecordUpsertArgs<ExtArgs>>): Prisma__DataRecordClient<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DataRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataRecordCountArgs} args - Arguments to filter DataRecords to count.
     * @example
     * // Count the number of DataRecords
     * const count = await prisma.dataRecord.count({
     *   where: {
     *     // ... the filter for the DataRecords we want to count
     *   }
     * })
    **/
    count<T extends DataRecordCountArgs>(
      args?: Subset<T, DataRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DataRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DataRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DataRecordAggregateArgs>(args: Subset<T, DataRecordAggregateArgs>): Prisma.PrismaPromise<GetDataRecordAggregateType<T>>

    /**
     * Group by DataRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DataRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DataRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DataRecordGroupByArgs['orderBy'] }
        : { orderBy?: DataRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DataRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDataRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DataRecord model
   */
  readonly fields: DataRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DataRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DataRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dataset<T extends DatasetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DatasetDefaultArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends DataRecord$tasksArgs<ExtArgs> = {}>(args?: Subset<T, DataRecord$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    labels<T extends DataRecord$labelsArgs<ExtArgs> = {}>(args?: Subset<T, DataRecord$labelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DataRecord model
   */
  interface DataRecordFieldRefs {
    readonly id: FieldRef<"DataRecord", 'String'>
    readonly recordNumber: FieldRef<"DataRecord", 'Int'>
    readonly rawData: FieldRef<"DataRecord", 'Json'>
    readonly isLabeled: FieldRef<"DataRecord", 'Boolean'>
    readonly createdAt: FieldRef<"DataRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"DataRecord", 'DateTime'>
    readonly datasetId: FieldRef<"DataRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DataRecord findUnique
   */
  export type DataRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    /**
     * Filter, which DataRecord to fetch.
     */
    where: DataRecordWhereUniqueInput
  }

  /**
   * DataRecord findUniqueOrThrow
   */
  export type DataRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    /**
     * Filter, which DataRecord to fetch.
     */
    where: DataRecordWhereUniqueInput
  }

  /**
   * DataRecord findFirst
   */
  export type DataRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    /**
     * Filter, which DataRecord to fetch.
     */
    where?: DataRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataRecords to fetch.
     */
    orderBy?: DataRecordOrderByWithRelationInput | DataRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataRecords.
     */
    cursor?: DataRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataRecords.
     */
    distinct?: DataRecordScalarFieldEnum | DataRecordScalarFieldEnum[]
  }

  /**
   * DataRecord findFirstOrThrow
   */
  export type DataRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    /**
     * Filter, which DataRecord to fetch.
     */
    where?: DataRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataRecords to fetch.
     */
    orderBy?: DataRecordOrderByWithRelationInput | DataRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DataRecords.
     */
    cursor?: DataRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataRecords.
     */
    distinct?: DataRecordScalarFieldEnum | DataRecordScalarFieldEnum[]
  }

  /**
   * DataRecord findMany
   */
  export type DataRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    /**
     * Filter, which DataRecords to fetch.
     */
    where?: DataRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DataRecords to fetch.
     */
    orderBy?: DataRecordOrderByWithRelationInput | DataRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DataRecords.
     */
    cursor?: DataRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DataRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DataRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DataRecords.
     */
    distinct?: DataRecordScalarFieldEnum | DataRecordScalarFieldEnum[]
  }

  /**
   * DataRecord create
   */
  export type DataRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a DataRecord.
     */
    data: XOR<DataRecordCreateInput, DataRecordUncheckedCreateInput>
  }

  /**
   * DataRecord createMany
   */
  export type DataRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DataRecords.
     */
    data: DataRecordCreateManyInput | DataRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DataRecord createManyAndReturn
   */
  export type DataRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * The data used to create many DataRecords.
     */
    data: DataRecordCreateManyInput | DataRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DataRecord update
   */
  export type DataRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a DataRecord.
     */
    data: XOR<DataRecordUpdateInput, DataRecordUncheckedUpdateInput>
    /**
     * Choose, which DataRecord to update.
     */
    where: DataRecordWhereUniqueInput
  }

  /**
   * DataRecord updateMany
   */
  export type DataRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DataRecords.
     */
    data: XOR<DataRecordUpdateManyMutationInput, DataRecordUncheckedUpdateManyInput>
    /**
     * Filter which DataRecords to update
     */
    where?: DataRecordWhereInput
    /**
     * Limit how many DataRecords to update.
     */
    limit?: number
  }

  /**
   * DataRecord updateManyAndReturn
   */
  export type DataRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * The data used to update DataRecords.
     */
    data: XOR<DataRecordUpdateManyMutationInput, DataRecordUncheckedUpdateManyInput>
    /**
     * Filter which DataRecords to update
     */
    where?: DataRecordWhereInput
    /**
     * Limit how many DataRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DataRecord upsert
   */
  export type DataRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the DataRecord to update in case it exists.
     */
    where: DataRecordWhereUniqueInput
    /**
     * In case the DataRecord found by the `where` argument doesn't exist, create a new DataRecord with this data.
     */
    create: XOR<DataRecordCreateInput, DataRecordUncheckedCreateInput>
    /**
     * In case the DataRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DataRecordUpdateInput, DataRecordUncheckedUpdateInput>
  }

  /**
   * DataRecord delete
   */
  export type DataRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    /**
     * Filter which DataRecord to delete.
     */
    where: DataRecordWhereUniqueInput
  }

  /**
   * DataRecord deleteMany
   */
  export type DataRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DataRecords to delete
     */
    where?: DataRecordWhereInput
    /**
     * Limit how many DataRecords to delete.
     */
    limit?: number
  }

  /**
   * DataRecord.tasks
   */
  export type DataRecord$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * DataRecord.labels
   */
  export type DataRecord$labelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    where?: LabelWhereInput
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    cursor?: LabelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LabelScalarFieldEnum | LabelScalarFieldEnum[]
  }

  /**
   * DataRecord without action
   */
  export type DataRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    reward: number | null
    requiredLabels: number | null
    submittedLabels: number | null
    consensusThreshold: number | null
  }

  export type TaskSumAggregateOutputType = {
    reward: number | null
    requiredLabels: number | null
    submittedLabels: number | null
    consensusThreshold: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    reward: number | null
    requiredLabels: number | null
    submittedLabels: number | null
    consensusThreshold: number | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    datasetId: string | null
    recordId: string | null
    assignedToId: string | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    reward: number | null
    requiredLabels: number | null
    submittedLabels: number | null
    consensusThreshold: number | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    datasetId: string | null
    recordId: string | null
    assignedToId: string | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    reward: number
    requiredLabels: number
    submittedLabels: number
    consensusThreshold: number
    metadata: number
    completedAt: number
    createdAt: number
    updatedAt: number
    datasetId: number
    recordId: number
    assignedToId: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    reward?: true
    requiredLabels?: true
    submittedLabels?: true
    consensusThreshold?: true
  }

  export type TaskSumAggregateInputType = {
    reward?: true
    requiredLabels?: true
    submittedLabels?: true
    consensusThreshold?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    reward?: true
    requiredLabels?: true
    submittedLabels?: true
    consensusThreshold?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    datasetId?: true
    recordId?: true
    assignedToId?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    reward?: true
    requiredLabels?: true
    submittedLabels?: true
    consensusThreshold?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    datasetId?: true
    recordId?: true
    assignedToId?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    reward?: true
    requiredLabels?: true
    submittedLabels?: true
    consensusThreshold?: true
    metadata?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    datasetId?: true
    recordId?: true
    assignedToId?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    title: string
    description: string
    status: string
    reward: number
    requiredLabels: number
    submittedLabels: number
    consensusThreshold: number
    metadata: JsonValue | null
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    datasetId: string
    recordId: string | null
    assignedToId: string | null
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    reward?: boolean
    requiredLabels?: boolean
    submittedLabels?: boolean
    consensusThreshold?: boolean
    metadata?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    datasetId?: boolean
    recordId?: boolean
    assignedToId?: boolean
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    record?: boolean | Task$recordArgs<ExtArgs>
    assignedTo?: boolean | Task$assignedToArgs<ExtArgs>
    labels?: boolean | Task$labelsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    reward?: boolean
    requiredLabels?: boolean
    submittedLabels?: boolean
    consensusThreshold?: boolean
    metadata?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    datasetId?: boolean
    recordId?: boolean
    assignedToId?: boolean
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    record?: boolean | Task$recordArgs<ExtArgs>
    assignedTo?: boolean | Task$assignedToArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    reward?: boolean
    requiredLabels?: boolean
    submittedLabels?: boolean
    consensusThreshold?: boolean
    metadata?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    datasetId?: boolean
    recordId?: boolean
    assignedToId?: boolean
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    record?: boolean | Task$recordArgs<ExtArgs>
    assignedTo?: boolean | Task$assignedToArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    reward?: boolean
    requiredLabels?: boolean
    submittedLabels?: boolean
    consensusThreshold?: boolean
    metadata?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    datasetId?: boolean
    recordId?: boolean
    assignedToId?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "reward" | "requiredLabels" | "submittedLabels" | "consensusThreshold" | "metadata" | "completedAt" | "createdAt" | "updatedAt" | "datasetId" | "recordId" | "assignedToId", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    record?: boolean | Task$recordArgs<ExtArgs>
    assignedTo?: boolean | Task$assignedToArgs<ExtArgs>
    labels?: boolean | Task$labelsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    record?: boolean | Task$recordArgs<ExtArgs>
    assignedTo?: boolean | Task$assignedToArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    record?: boolean | Task$recordArgs<ExtArgs>
    assignedTo?: boolean | Task$assignedToArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      dataset: Prisma.$DatasetPayload<ExtArgs>
      record: Prisma.$DataRecordPayload<ExtArgs> | null
      assignedTo: Prisma.$UserPayload<ExtArgs> | null
      labels: Prisma.$LabelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      status: string
      reward: number
      requiredLabels: number
      submittedLabels: number
      consensusThreshold: number
      metadata: Prisma.JsonValue | null
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
      datasetId: string
      recordId: string | null
      assignedToId: string | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dataset<T extends DatasetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DatasetDefaultArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    record<T extends Task$recordArgs<ExtArgs> = {}>(args?: Subset<T, Task$recordArgs<ExtArgs>>): Prisma__DataRecordClient<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    assignedTo<T extends Task$assignedToArgs<ExtArgs> = {}>(args?: Subset<T, Task$assignedToArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    labels<T extends Task$labelsArgs<ExtArgs> = {}>(args?: Subset<T, Task$labelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly status: FieldRef<"Task", 'String'>
    readonly reward: FieldRef<"Task", 'Float'>
    readonly requiredLabels: FieldRef<"Task", 'Int'>
    readonly submittedLabels: FieldRef<"Task", 'Int'>
    readonly consensusThreshold: FieldRef<"Task", 'Float'>
    readonly metadata: FieldRef<"Task", 'Json'>
    readonly completedAt: FieldRef<"Task", 'DateTime'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
    readonly datasetId: FieldRef<"Task", 'String'>
    readonly recordId: FieldRef<"Task", 'String'>
    readonly assignedToId: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.record
   */
  export type Task$recordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    where?: DataRecordWhereInput
  }

  /**
   * Task.assignedTo
   */
  export type Task$assignedToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Task.labels
   */
  export type Task$labelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    where?: LabelWhereInput
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    cursor?: LabelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LabelScalarFieldEnum | LabelScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Label
   */

  export type AggregateLabel = {
    _count: LabelCountAggregateOutputType | null
    _avg: LabelAvgAggregateOutputType | null
    _sum: LabelSumAggregateOutputType | null
    _min: LabelMinAggregateOutputType | null
    _max: LabelMaxAggregateOutputType | null
  }

  export type LabelAvgAggregateOutputType = {
    confidence: number | null
    timeSpentSeconds: number | null
  }

  export type LabelSumAggregateOutputType = {
    confidence: number | null
    timeSpentSeconds: number | null
  }

  export type LabelMinAggregateOutputType = {
    id: string | null
    value: string | null
    confidence: number | null
    isAccepted: boolean | null
    isRejected: boolean | null
    rejectionReason: string | null
    timeSpentSeconds: number | null
    createdAt: Date | null
    taskId: string | null
    recordId: string | null
    contributorId: string | null
  }

  export type LabelMaxAggregateOutputType = {
    id: string | null
    value: string | null
    confidence: number | null
    isAccepted: boolean | null
    isRejected: boolean | null
    rejectionReason: string | null
    timeSpentSeconds: number | null
    createdAt: Date | null
    taskId: string | null
    recordId: string | null
    contributorId: string | null
  }

  export type LabelCountAggregateOutputType = {
    id: number
    value: number
    confidence: number
    isAccepted: number
    isRejected: number
    rejectionReason: number
    timeSpentSeconds: number
    metadata: number
    createdAt: number
    taskId: number
    recordId: number
    contributorId: number
    _all: number
  }


  export type LabelAvgAggregateInputType = {
    confidence?: true
    timeSpentSeconds?: true
  }

  export type LabelSumAggregateInputType = {
    confidence?: true
    timeSpentSeconds?: true
  }

  export type LabelMinAggregateInputType = {
    id?: true
    value?: true
    confidence?: true
    isAccepted?: true
    isRejected?: true
    rejectionReason?: true
    timeSpentSeconds?: true
    createdAt?: true
    taskId?: true
    recordId?: true
    contributorId?: true
  }

  export type LabelMaxAggregateInputType = {
    id?: true
    value?: true
    confidence?: true
    isAccepted?: true
    isRejected?: true
    rejectionReason?: true
    timeSpentSeconds?: true
    createdAt?: true
    taskId?: true
    recordId?: true
    contributorId?: true
  }

  export type LabelCountAggregateInputType = {
    id?: true
    value?: true
    confidence?: true
    isAccepted?: true
    isRejected?: true
    rejectionReason?: true
    timeSpentSeconds?: true
    metadata?: true
    createdAt?: true
    taskId?: true
    recordId?: true
    contributorId?: true
    _all?: true
  }

  export type LabelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Label to aggregate.
     */
    where?: LabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labels to fetch.
     */
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Labels
    **/
    _count?: true | LabelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LabelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LabelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LabelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LabelMaxAggregateInputType
  }

  export type GetLabelAggregateType<T extends LabelAggregateArgs> = {
        [P in keyof T & keyof AggregateLabel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLabel[P]>
      : GetScalarType<T[P], AggregateLabel[P]>
  }




  export type LabelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabelWhereInput
    orderBy?: LabelOrderByWithAggregationInput | LabelOrderByWithAggregationInput[]
    by: LabelScalarFieldEnum[] | LabelScalarFieldEnum
    having?: LabelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LabelCountAggregateInputType | true
    _avg?: LabelAvgAggregateInputType
    _sum?: LabelSumAggregateInputType
    _min?: LabelMinAggregateInputType
    _max?: LabelMaxAggregateInputType
  }

  export type LabelGroupByOutputType = {
    id: string
    value: string
    confidence: number
    isAccepted: boolean
    isRejected: boolean
    rejectionReason: string | null
    timeSpentSeconds: number
    metadata: JsonValue | null
    createdAt: Date
    taskId: string
    recordId: string | null
    contributorId: string
    _count: LabelCountAggregateOutputType | null
    _avg: LabelAvgAggregateOutputType | null
    _sum: LabelSumAggregateOutputType | null
    _min: LabelMinAggregateOutputType | null
    _max: LabelMaxAggregateOutputType | null
  }

  type GetLabelGroupByPayload<T extends LabelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LabelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LabelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LabelGroupByOutputType[P]>
            : GetScalarType<T[P], LabelGroupByOutputType[P]>
        }
      >
    >


  export type LabelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    confidence?: boolean
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: boolean
    timeSpentSeconds?: boolean
    metadata?: boolean
    createdAt?: boolean
    taskId?: boolean
    recordId?: boolean
    contributorId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    record?: boolean | Label$recordArgs<ExtArgs>
    contributor?: boolean | UserDefaultArgs<ExtArgs>
    payout?: boolean | Label$payoutArgs<ExtArgs>
  }, ExtArgs["result"]["label"]>

  export type LabelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    confidence?: boolean
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: boolean
    timeSpentSeconds?: boolean
    metadata?: boolean
    createdAt?: boolean
    taskId?: boolean
    recordId?: boolean
    contributorId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    record?: boolean | Label$recordArgs<ExtArgs>
    contributor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["label"]>

  export type LabelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    confidence?: boolean
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: boolean
    timeSpentSeconds?: boolean
    metadata?: boolean
    createdAt?: boolean
    taskId?: boolean
    recordId?: boolean
    contributorId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
    record?: boolean | Label$recordArgs<ExtArgs>
    contributor?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["label"]>

  export type LabelSelectScalar = {
    id?: boolean
    value?: boolean
    confidence?: boolean
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: boolean
    timeSpentSeconds?: boolean
    metadata?: boolean
    createdAt?: boolean
    taskId?: boolean
    recordId?: boolean
    contributorId?: boolean
  }

  export type LabelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value" | "confidence" | "isAccepted" | "isRejected" | "rejectionReason" | "timeSpentSeconds" | "metadata" | "createdAt" | "taskId" | "recordId" | "contributorId", ExtArgs["result"]["label"]>
  export type LabelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    record?: boolean | Label$recordArgs<ExtArgs>
    contributor?: boolean | UserDefaultArgs<ExtArgs>
    payout?: boolean | Label$payoutArgs<ExtArgs>
  }
  export type LabelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    record?: boolean | Label$recordArgs<ExtArgs>
    contributor?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LabelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
    record?: boolean | Label$recordArgs<ExtArgs>
    contributor?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LabelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Label"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
      record: Prisma.$DataRecordPayload<ExtArgs> | null
      contributor: Prisma.$UserPayload<ExtArgs>
      payout: Prisma.$PayoutPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      value: string
      confidence: number
      isAccepted: boolean
      isRejected: boolean
      rejectionReason: string | null
      timeSpentSeconds: number
      metadata: Prisma.JsonValue | null
      createdAt: Date
      taskId: string
      recordId: string | null
      contributorId: string
    }, ExtArgs["result"]["label"]>
    composites: {}
  }

  type LabelGetPayload<S extends boolean | null | undefined | LabelDefaultArgs> = $Result.GetResult<Prisma.$LabelPayload, S>

  type LabelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LabelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LabelCountAggregateInputType | true
    }

  export interface LabelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Label'], meta: { name: 'Label' } }
    /**
     * Find zero or one Label that matches the filter.
     * @param {LabelFindUniqueArgs} args - Arguments to find a Label
     * @example
     * // Get one Label
     * const label = await prisma.label.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LabelFindUniqueArgs>(args: SelectSubset<T, LabelFindUniqueArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Label that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LabelFindUniqueOrThrowArgs} args - Arguments to find a Label
     * @example
     * // Get one Label
     * const label = await prisma.label.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LabelFindUniqueOrThrowArgs>(args: SelectSubset<T, LabelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Label that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelFindFirstArgs} args - Arguments to find a Label
     * @example
     * // Get one Label
     * const label = await prisma.label.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LabelFindFirstArgs>(args?: SelectSubset<T, LabelFindFirstArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Label that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelFindFirstOrThrowArgs} args - Arguments to find a Label
     * @example
     * // Get one Label
     * const label = await prisma.label.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LabelFindFirstOrThrowArgs>(args?: SelectSubset<T, LabelFindFirstOrThrowArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Labels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Labels
     * const labels = await prisma.label.findMany()
     * 
     * // Get first 10 Labels
     * const labels = await prisma.label.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const labelWithIdOnly = await prisma.label.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LabelFindManyArgs>(args?: SelectSubset<T, LabelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Label.
     * @param {LabelCreateArgs} args - Arguments to create a Label.
     * @example
     * // Create one Label
     * const Label = await prisma.label.create({
     *   data: {
     *     // ... data to create a Label
     *   }
     * })
     * 
     */
    create<T extends LabelCreateArgs>(args: SelectSubset<T, LabelCreateArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Labels.
     * @param {LabelCreateManyArgs} args - Arguments to create many Labels.
     * @example
     * // Create many Labels
     * const label = await prisma.label.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LabelCreateManyArgs>(args?: SelectSubset<T, LabelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Labels and returns the data saved in the database.
     * @param {LabelCreateManyAndReturnArgs} args - Arguments to create many Labels.
     * @example
     * // Create many Labels
     * const label = await prisma.label.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Labels and only return the `id`
     * const labelWithIdOnly = await prisma.label.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LabelCreateManyAndReturnArgs>(args?: SelectSubset<T, LabelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Label.
     * @param {LabelDeleteArgs} args - Arguments to delete one Label.
     * @example
     * // Delete one Label
     * const Label = await prisma.label.delete({
     *   where: {
     *     // ... filter to delete one Label
     *   }
     * })
     * 
     */
    delete<T extends LabelDeleteArgs>(args: SelectSubset<T, LabelDeleteArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Label.
     * @param {LabelUpdateArgs} args - Arguments to update one Label.
     * @example
     * // Update one Label
     * const label = await prisma.label.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LabelUpdateArgs>(args: SelectSubset<T, LabelUpdateArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Labels.
     * @param {LabelDeleteManyArgs} args - Arguments to filter Labels to delete.
     * @example
     * // Delete a few Labels
     * const { count } = await prisma.label.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LabelDeleteManyArgs>(args?: SelectSubset<T, LabelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Labels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Labels
     * const label = await prisma.label.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LabelUpdateManyArgs>(args: SelectSubset<T, LabelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Labels and returns the data updated in the database.
     * @param {LabelUpdateManyAndReturnArgs} args - Arguments to update many Labels.
     * @example
     * // Update many Labels
     * const label = await prisma.label.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Labels and only return the `id`
     * const labelWithIdOnly = await prisma.label.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LabelUpdateManyAndReturnArgs>(args: SelectSubset<T, LabelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Label.
     * @param {LabelUpsertArgs} args - Arguments to update or create a Label.
     * @example
     * // Update or create a Label
     * const label = await prisma.label.upsert({
     *   create: {
     *     // ... data to create a Label
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Label we want to update
     *   }
     * })
     */
    upsert<T extends LabelUpsertArgs>(args: SelectSubset<T, LabelUpsertArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Labels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelCountArgs} args - Arguments to filter Labels to count.
     * @example
     * // Count the number of Labels
     * const count = await prisma.label.count({
     *   where: {
     *     // ... the filter for the Labels we want to count
     *   }
     * })
    **/
    count<T extends LabelCountArgs>(
      args?: Subset<T, LabelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LabelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Label.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LabelAggregateArgs>(args: Subset<T, LabelAggregateArgs>): Prisma.PrismaPromise<GetLabelAggregateType<T>>

    /**
     * Group by Label.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LabelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LabelGroupByArgs['orderBy'] }
        : { orderBy?: LabelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LabelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLabelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Label model
   */
  readonly fields: LabelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Label.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LabelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    record<T extends Label$recordArgs<ExtArgs> = {}>(args?: Subset<T, Label$recordArgs<ExtArgs>>): Prisma__DataRecordClient<$Result.GetResult<Prisma.$DataRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    contributor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payout<T extends Label$payoutArgs<ExtArgs> = {}>(args?: Subset<T, Label$payoutArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Label model
   */
  interface LabelFieldRefs {
    readonly id: FieldRef<"Label", 'String'>
    readonly value: FieldRef<"Label", 'String'>
    readonly confidence: FieldRef<"Label", 'Float'>
    readonly isAccepted: FieldRef<"Label", 'Boolean'>
    readonly isRejected: FieldRef<"Label", 'Boolean'>
    readonly rejectionReason: FieldRef<"Label", 'String'>
    readonly timeSpentSeconds: FieldRef<"Label", 'Int'>
    readonly metadata: FieldRef<"Label", 'Json'>
    readonly createdAt: FieldRef<"Label", 'DateTime'>
    readonly taskId: FieldRef<"Label", 'String'>
    readonly recordId: FieldRef<"Label", 'String'>
    readonly contributorId: FieldRef<"Label", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Label findUnique
   */
  export type LabelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter, which Label to fetch.
     */
    where: LabelWhereUniqueInput
  }

  /**
   * Label findUniqueOrThrow
   */
  export type LabelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter, which Label to fetch.
     */
    where: LabelWhereUniqueInput
  }

  /**
   * Label findFirst
   */
  export type LabelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter, which Label to fetch.
     */
    where?: LabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labels to fetch.
     */
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Labels.
     */
    cursor?: LabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Labels.
     */
    distinct?: LabelScalarFieldEnum | LabelScalarFieldEnum[]
  }

  /**
   * Label findFirstOrThrow
   */
  export type LabelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter, which Label to fetch.
     */
    where?: LabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labels to fetch.
     */
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Labels.
     */
    cursor?: LabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Labels.
     */
    distinct?: LabelScalarFieldEnum | LabelScalarFieldEnum[]
  }

  /**
   * Label findMany
   */
  export type LabelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter, which Labels to fetch.
     */
    where?: LabelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labels to fetch.
     */
    orderBy?: LabelOrderByWithRelationInput | LabelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Labels.
     */
    cursor?: LabelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Labels.
     */
    distinct?: LabelScalarFieldEnum | LabelScalarFieldEnum[]
  }

  /**
   * Label create
   */
  export type LabelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * The data needed to create a Label.
     */
    data: XOR<LabelCreateInput, LabelUncheckedCreateInput>
  }

  /**
   * Label createMany
   */
  export type LabelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Labels.
     */
    data: LabelCreateManyInput | LabelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Label createManyAndReturn
   */
  export type LabelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * The data used to create many Labels.
     */
    data: LabelCreateManyInput | LabelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Label update
   */
  export type LabelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * The data needed to update a Label.
     */
    data: XOR<LabelUpdateInput, LabelUncheckedUpdateInput>
    /**
     * Choose, which Label to update.
     */
    where: LabelWhereUniqueInput
  }

  /**
   * Label updateMany
   */
  export type LabelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Labels.
     */
    data: XOR<LabelUpdateManyMutationInput, LabelUncheckedUpdateManyInput>
    /**
     * Filter which Labels to update
     */
    where?: LabelWhereInput
    /**
     * Limit how many Labels to update.
     */
    limit?: number
  }

  /**
   * Label updateManyAndReturn
   */
  export type LabelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * The data used to update Labels.
     */
    data: XOR<LabelUpdateManyMutationInput, LabelUncheckedUpdateManyInput>
    /**
     * Filter which Labels to update
     */
    where?: LabelWhereInput
    /**
     * Limit how many Labels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Label upsert
   */
  export type LabelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * The filter to search for the Label to update in case it exists.
     */
    where: LabelWhereUniqueInput
    /**
     * In case the Label found by the `where` argument doesn't exist, create a new Label with this data.
     */
    create: XOR<LabelCreateInput, LabelUncheckedCreateInput>
    /**
     * In case the Label was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LabelUpdateInput, LabelUncheckedUpdateInput>
  }

  /**
   * Label delete
   */
  export type LabelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    /**
     * Filter which Label to delete.
     */
    where: LabelWhereUniqueInput
  }

  /**
   * Label deleteMany
   */
  export type LabelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Labels to delete
     */
    where?: LabelWhereInput
    /**
     * Limit how many Labels to delete.
     */
    limit?: number
  }

  /**
   * Label.record
   */
  export type Label$recordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DataRecord
     */
    select?: DataRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DataRecord
     */
    omit?: DataRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DataRecordInclude<ExtArgs> | null
    where?: DataRecordWhereInput
  }

  /**
   * Label.payout
   */
  export type Label$payoutArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    where?: PayoutWhereInput
  }

  /**
   * Label without action
   */
  export type LabelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
  }


  /**
   * Model Payout
   */

  export type AggregatePayout = {
    _count: PayoutCountAggregateOutputType | null
    _avg: PayoutAvgAggregateOutputType | null
    _sum: PayoutSumAggregateOutputType | null
    _min: PayoutMinAggregateOutputType | null
    _max: PayoutMaxAggregateOutputType | null
  }

  export type PayoutAvgAggregateOutputType = {
    amountSOL: number | null
  }

  export type PayoutSumAggregateOutputType = {
    amountSOL: number | null
  }

  export type PayoutMinAggregateOutputType = {
    id: string | null
    amountSOL: number | null
    status: string | null
    txHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    processedAt: Date | null
    contributorId: string | null
    datasetId: string | null
    labelId: string | null
  }

  export type PayoutMaxAggregateOutputType = {
    id: string | null
    amountSOL: number | null
    status: string | null
    txHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    processedAt: Date | null
    contributorId: string | null
    datasetId: string | null
    labelId: string | null
  }

  export type PayoutCountAggregateOutputType = {
    id: number
    amountSOL: number
    status: number
    txHash: number
    createdAt: number
    updatedAt: number
    processedAt: number
    contributorId: number
    datasetId: number
    labelId: number
    _all: number
  }


  export type PayoutAvgAggregateInputType = {
    amountSOL?: true
  }

  export type PayoutSumAggregateInputType = {
    amountSOL?: true
  }

  export type PayoutMinAggregateInputType = {
    id?: true
    amountSOL?: true
    status?: true
    txHash?: true
    createdAt?: true
    updatedAt?: true
    processedAt?: true
    contributorId?: true
    datasetId?: true
    labelId?: true
  }

  export type PayoutMaxAggregateInputType = {
    id?: true
    amountSOL?: true
    status?: true
    txHash?: true
    createdAt?: true
    updatedAt?: true
    processedAt?: true
    contributorId?: true
    datasetId?: true
    labelId?: true
  }

  export type PayoutCountAggregateInputType = {
    id?: true
    amountSOL?: true
    status?: true
    txHash?: true
    createdAt?: true
    updatedAt?: true
    processedAt?: true
    contributorId?: true
    datasetId?: true
    labelId?: true
    _all?: true
  }

  export type PayoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payout to aggregate.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payouts
    **/
    _count?: true | PayoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayoutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayoutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayoutMaxAggregateInputType
  }

  export type GetPayoutAggregateType<T extends PayoutAggregateArgs> = {
        [P in keyof T & keyof AggregatePayout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayout[P]>
      : GetScalarType<T[P], AggregatePayout[P]>
  }




  export type PayoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutWhereInput
    orderBy?: PayoutOrderByWithAggregationInput | PayoutOrderByWithAggregationInput[]
    by: PayoutScalarFieldEnum[] | PayoutScalarFieldEnum
    having?: PayoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayoutCountAggregateInputType | true
    _avg?: PayoutAvgAggregateInputType
    _sum?: PayoutSumAggregateInputType
    _min?: PayoutMinAggregateInputType
    _max?: PayoutMaxAggregateInputType
  }

  export type PayoutGroupByOutputType = {
    id: string
    amountSOL: number
    status: string
    txHash: string | null
    createdAt: Date
    updatedAt: Date
    processedAt: Date | null
    contributorId: string
    datasetId: string
    labelId: string | null
    _count: PayoutCountAggregateOutputType | null
    _avg: PayoutAvgAggregateOutputType | null
    _sum: PayoutSumAggregateOutputType | null
    _min: PayoutMinAggregateOutputType | null
    _max: PayoutMaxAggregateOutputType | null
  }

  type GetPayoutGroupByPayload<T extends PayoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayoutGroupByOutputType[P]>
            : GetScalarType<T[P], PayoutGroupByOutputType[P]>
        }
      >
    >


  export type PayoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountSOL?: boolean
    status?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    processedAt?: boolean
    contributorId?: boolean
    datasetId?: boolean
    labelId?: boolean
    contributor?: boolean | UserDefaultArgs<ExtArgs>
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    label?: boolean | Payout$labelArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountSOL?: boolean
    status?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    processedAt?: boolean
    contributorId?: boolean
    datasetId?: boolean
    labelId?: boolean
    contributor?: boolean | UserDefaultArgs<ExtArgs>
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    label?: boolean | Payout$labelArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountSOL?: boolean
    status?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    processedAt?: boolean
    contributorId?: boolean
    datasetId?: boolean
    labelId?: boolean
    contributor?: boolean | UserDefaultArgs<ExtArgs>
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    label?: boolean | Payout$labelArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>

  export type PayoutSelectScalar = {
    id?: boolean
    amountSOL?: boolean
    status?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    processedAt?: boolean
    contributorId?: boolean
    datasetId?: boolean
    labelId?: boolean
  }

  export type PayoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amountSOL" | "status" | "txHash" | "createdAt" | "updatedAt" | "processedAt" | "contributorId" | "datasetId" | "labelId", ExtArgs["result"]["payout"]>
  export type PayoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contributor?: boolean | UserDefaultArgs<ExtArgs>
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    label?: boolean | Payout$labelArgs<ExtArgs>
  }
  export type PayoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contributor?: boolean | UserDefaultArgs<ExtArgs>
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    label?: boolean | Payout$labelArgs<ExtArgs>
  }
  export type PayoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contributor?: boolean | UserDefaultArgs<ExtArgs>
    dataset?: boolean | DatasetDefaultArgs<ExtArgs>
    label?: boolean | Payout$labelArgs<ExtArgs>
  }

  export type $PayoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payout"
    objects: {
      contributor: Prisma.$UserPayload<ExtArgs>
      dataset: Prisma.$DatasetPayload<ExtArgs>
      label: Prisma.$LabelPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amountSOL: number
      status: string
      txHash: string | null
      createdAt: Date
      updatedAt: Date
      processedAt: Date | null
      contributorId: string
      datasetId: string
      labelId: string | null
    }, ExtArgs["result"]["payout"]>
    composites: {}
  }

  type PayoutGetPayload<S extends boolean | null | undefined | PayoutDefaultArgs> = $Result.GetResult<Prisma.$PayoutPayload, S>

  type PayoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayoutCountAggregateInputType | true
    }

  export interface PayoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payout'], meta: { name: 'Payout' } }
    /**
     * Find zero or one Payout that matches the filter.
     * @param {PayoutFindUniqueArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoutFindUniqueArgs>(args: SelectSubset<T, PayoutFindUniqueArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayoutFindUniqueOrThrowArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoutFindUniqueOrThrowArgs>(args: SelectSubset<T, PayoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindFirstArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoutFindFirstArgs>(args?: SelectSubset<T, PayoutFindFirstArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindFirstOrThrowArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoutFindFirstOrThrowArgs>(args?: SelectSubset<T, PayoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payouts
     * const payouts = await prisma.payout.findMany()
     * 
     * // Get first 10 Payouts
     * const payouts = await prisma.payout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payoutWithIdOnly = await prisma.payout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayoutFindManyArgs>(args?: SelectSubset<T, PayoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payout.
     * @param {PayoutCreateArgs} args - Arguments to create a Payout.
     * @example
     * // Create one Payout
     * const Payout = await prisma.payout.create({
     *   data: {
     *     // ... data to create a Payout
     *   }
     * })
     * 
     */
    create<T extends PayoutCreateArgs>(args: SelectSubset<T, PayoutCreateArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payouts.
     * @param {PayoutCreateManyArgs} args - Arguments to create many Payouts.
     * @example
     * // Create many Payouts
     * const payout = await prisma.payout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayoutCreateManyArgs>(args?: SelectSubset<T, PayoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payouts and returns the data saved in the database.
     * @param {PayoutCreateManyAndReturnArgs} args - Arguments to create many Payouts.
     * @example
     * // Create many Payouts
     * const payout = await prisma.payout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payouts and only return the `id`
     * const payoutWithIdOnly = await prisma.payout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayoutCreateManyAndReturnArgs>(args?: SelectSubset<T, PayoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payout.
     * @param {PayoutDeleteArgs} args - Arguments to delete one Payout.
     * @example
     * // Delete one Payout
     * const Payout = await prisma.payout.delete({
     *   where: {
     *     // ... filter to delete one Payout
     *   }
     * })
     * 
     */
    delete<T extends PayoutDeleteArgs>(args: SelectSubset<T, PayoutDeleteArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payout.
     * @param {PayoutUpdateArgs} args - Arguments to update one Payout.
     * @example
     * // Update one Payout
     * const payout = await prisma.payout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayoutUpdateArgs>(args: SelectSubset<T, PayoutUpdateArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payouts.
     * @param {PayoutDeleteManyArgs} args - Arguments to filter Payouts to delete.
     * @example
     * // Delete a few Payouts
     * const { count } = await prisma.payout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayoutDeleteManyArgs>(args?: SelectSubset<T, PayoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payouts
     * const payout = await prisma.payout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayoutUpdateManyArgs>(args: SelectSubset<T, PayoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payouts and returns the data updated in the database.
     * @param {PayoutUpdateManyAndReturnArgs} args - Arguments to update many Payouts.
     * @example
     * // Update many Payouts
     * const payout = await prisma.payout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payouts and only return the `id`
     * const payoutWithIdOnly = await prisma.payout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PayoutUpdateManyAndReturnArgs>(args: SelectSubset<T, PayoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payout.
     * @param {PayoutUpsertArgs} args - Arguments to update or create a Payout.
     * @example
     * // Update or create a Payout
     * const payout = await prisma.payout.upsert({
     *   create: {
     *     // ... data to create a Payout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payout we want to update
     *   }
     * })
     */
    upsert<T extends PayoutUpsertArgs>(args: SelectSubset<T, PayoutUpsertArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutCountArgs} args - Arguments to filter Payouts to count.
     * @example
     * // Count the number of Payouts
     * const count = await prisma.payout.count({
     *   where: {
     *     // ... the filter for the Payouts we want to count
     *   }
     * })
    **/
    count<T extends PayoutCountArgs>(
      args?: Subset<T, PayoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PayoutAggregateArgs>(args: Subset<T, PayoutAggregateArgs>): Prisma.PrismaPromise<GetPayoutAggregateType<T>>

    /**
     * Group by Payout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PayoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayoutGroupByArgs['orderBy'] }
        : { orderBy?: PayoutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PayoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payout model
   */
  readonly fields: PayoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contributor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dataset<T extends DatasetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DatasetDefaultArgs<ExtArgs>>): Prisma__DatasetClient<$Result.GetResult<Prisma.$DatasetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    label<T extends Payout$labelArgs<ExtArgs> = {}>(args?: Subset<T, Payout$labelArgs<ExtArgs>>): Prisma__LabelClient<$Result.GetResult<Prisma.$LabelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payout model
   */
  interface PayoutFieldRefs {
    readonly id: FieldRef<"Payout", 'String'>
    readonly amountSOL: FieldRef<"Payout", 'Float'>
    readonly status: FieldRef<"Payout", 'String'>
    readonly txHash: FieldRef<"Payout", 'String'>
    readonly createdAt: FieldRef<"Payout", 'DateTime'>
    readonly updatedAt: FieldRef<"Payout", 'DateTime'>
    readonly processedAt: FieldRef<"Payout", 'DateTime'>
    readonly contributorId: FieldRef<"Payout", 'String'>
    readonly datasetId: FieldRef<"Payout", 'String'>
    readonly labelId: FieldRef<"Payout", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Payout findUnique
   */
  export type PayoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout findUniqueOrThrow
   */
  export type PayoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout findFirst
   */
  export type PayoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout findFirstOrThrow
   */
  export type PayoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout findMany
   */
  export type PayoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payouts to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout create
   */
  export type PayoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The data needed to create a Payout.
     */
    data: XOR<PayoutCreateInput, PayoutUncheckedCreateInput>
  }

  /**
   * Payout createMany
   */
  export type PayoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payouts.
     */
    data: PayoutCreateManyInput | PayoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payout createManyAndReturn
   */
  export type PayoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * The data used to create many Payouts.
     */
    data: PayoutCreateManyInput | PayoutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payout update
   */
  export type PayoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The data needed to update a Payout.
     */
    data: XOR<PayoutUpdateInput, PayoutUncheckedUpdateInput>
    /**
     * Choose, which Payout to update.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout updateMany
   */
  export type PayoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payouts.
     */
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyInput>
    /**
     * Filter which Payouts to update
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to update.
     */
    limit?: number
  }

  /**
   * Payout updateManyAndReturn
   */
  export type PayoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * The data used to update Payouts.
     */
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyInput>
    /**
     * Filter which Payouts to update
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payout upsert
   */
  export type PayoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The filter to search for the Payout to update in case it exists.
     */
    where: PayoutWhereUniqueInput
    /**
     * In case the Payout found by the `where` argument doesn't exist, create a new Payout with this data.
     */
    create: XOR<PayoutCreateInput, PayoutUncheckedCreateInput>
    /**
     * In case the Payout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayoutUpdateInput, PayoutUncheckedUpdateInput>
  }

  /**
   * Payout delete
   */
  export type PayoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter which Payout to delete.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout deleteMany
   */
  export type PayoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payouts to delete
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to delete.
     */
    limit?: number
  }

  /**
   * Payout.label
   */
  export type Payout$labelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Label
     */
    select?: LabelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Label
     */
    omit?: LabelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabelInclude<ExtArgs> | null
    where?: LabelWhereInput
  }

  /**
   * Payout without action
   */
  export type PayoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    amount: number | null
    status: string | null
    transactionHash: string | null
    toAddress: string | null
    fromAddress: string | null
    description: string | null
    errorMessage: string | null
    createdAt: Date | null
    completedAt: Date | null
    userId: string | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    amount: number | null
    status: string | null
    transactionHash: string | null
    toAddress: string | null
    fromAddress: string | null
    description: string | null
    errorMessage: string | null
    createdAt: Date | null
    completedAt: Date | null
    userId: string | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    amount: number
    status: number
    transactionHash: number
    toAddress: number
    fromAddress: number
    description: number
    errorMessage: number
    metadata: number
    createdAt: number
    completedAt: number
    userId: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    amount?: true
    status?: true
    transactionHash?: true
    toAddress?: true
    fromAddress?: true
    description?: true
    errorMessage?: true
    createdAt?: true
    completedAt?: true
    userId?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    amount?: true
    status?: true
    transactionHash?: true
    toAddress?: true
    fromAddress?: true
    description?: true
    errorMessage?: true
    createdAt?: true
    completedAt?: true
    userId?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    amount?: true
    status?: true
    transactionHash?: true
    toAddress?: true
    fromAddress?: true
    description?: true
    errorMessage?: true
    metadata?: true
    createdAt?: true
    completedAt?: true
    userId?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    amount: number
    status: string
    transactionHash: string | null
    toAddress: string
    fromAddress: string | null
    description: string | null
    errorMessage: string | null
    metadata: JsonValue | null
    createdAt: Date
    completedAt: Date | null
    userId: string
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    status?: boolean
    transactionHash?: boolean
    toAddress?: boolean
    fromAddress?: boolean
    description?: boolean
    errorMessage?: boolean
    metadata?: boolean
    createdAt?: boolean
    completedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    status?: boolean
    transactionHash?: boolean
    toAddress?: boolean
    fromAddress?: boolean
    description?: boolean
    errorMessage?: boolean
    metadata?: boolean
    createdAt?: boolean
    completedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    status?: boolean
    transactionHash?: boolean
    toAddress?: boolean
    fromAddress?: boolean
    description?: boolean
    errorMessage?: boolean
    metadata?: boolean
    createdAt?: boolean
    completedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    amount?: boolean
    status?: boolean
    transactionHash?: boolean
    toAddress?: boolean
    fromAddress?: boolean
    description?: boolean
    errorMessage?: boolean
    metadata?: boolean
    createdAt?: boolean
    completedAt?: boolean
    userId?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "status" | "transactionHash" | "toAddress" | "fromAddress" | "description" | "errorMessage" | "metadata" | "createdAt" | "completedAt" | "userId", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: number
      status: string
      transactionHash: string | null
      toAddress: string
      fromAddress: string | null
      description: string | null
      errorMessage: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      completedAt: Date | null
      userId: string
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Float'>
    readonly status: FieldRef<"Transaction", 'String'>
    readonly transactionHash: FieldRef<"Transaction", 'String'>
    readonly toAddress: FieldRef<"Transaction", 'String'>
    readonly fromAddress: FieldRef<"Transaction", 'String'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly errorMessage: FieldRef<"Transaction", 'String'>
    readonly metadata: FieldRef<"Transaction", 'Json'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly completedAt: FieldRef<"Transaction", 'DateTime'>
    readonly userId: FieldRef<"Transaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role',
    walletAddress: 'walletAddress',
    isActive: 'isActive',
    totalEarnings: 'totalEarnings',
    tasksCompleted: 'tasksCompleted',
    accuracyRate: 'accuracyRate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DatasetScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    format: 'format',
    filePath: 'filePath',
    totalRecords: 'totalRecords',
    labeledRecords: 'labeledRecords',
    labelType: 'labelType',
    labelOptions: 'labelOptions',
    labelSchema: 'labelSchema',
    totalRewardSOL: 'totalRewardSOL',
    rewardPerRecord: 'rewardPerRecord',
    maxLabelsPerRecord: 'maxLabelsPerRecord',
    consensusThreshold: 'consensusThreshold',
    schema: 'schema',
    validationRules: 'validationRules',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type DatasetScalarFieldEnum = (typeof DatasetScalarFieldEnum)[keyof typeof DatasetScalarFieldEnum]


  export const DataRecordScalarFieldEnum: {
    id: 'id',
    recordNumber: 'recordNumber',
    rawData: 'rawData',
    isLabeled: 'isLabeled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    datasetId: 'datasetId'
  };

  export type DataRecordScalarFieldEnum = (typeof DataRecordScalarFieldEnum)[keyof typeof DataRecordScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    reward: 'reward',
    requiredLabels: 'requiredLabels',
    submittedLabels: 'submittedLabels',
    consensusThreshold: 'consensusThreshold',
    metadata: 'metadata',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    datasetId: 'datasetId',
    recordId: 'recordId',
    assignedToId: 'assignedToId'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const LabelScalarFieldEnum: {
    id: 'id',
    value: 'value',
    confidence: 'confidence',
    isAccepted: 'isAccepted',
    isRejected: 'isRejected',
    rejectionReason: 'rejectionReason',
    timeSpentSeconds: 'timeSpentSeconds',
    metadata: 'metadata',
    createdAt: 'createdAt',
    taskId: 'taskId',
    recordId: 'recordId',
    contributorId: 'contributorId'
  };

  export type LabelScalarFieldEnum = (typeof LabelScalarFieldEnum)[keyof typeof LabelScalarFieldEnum]


  export const PayoutScalarFieldEnum: {
    id: 'id',
    amountSOL: 'amountSOL',
    status: 'status',
    txHash: 'txHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    processedAt: 'processedAt',
    contributorId: 'contributorId',
    datasetId: 'datasetId',
    labelId: 'labelId'
  };

  export type PayoutScalarFieldEnum = (typeof PayoutScalarFieldEnum)[keyof typeof PayoutScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    status: 'status',
    transactionHash: 'transactionHash',
    toAddress: 'toAddress',
    fromAddress: 'fromAddress',
    description: 'description',
    errorMessage: 'errorMessage',
    metadata: 'metadata',
    createdAt: 'createdAt',
    completedAt: 'completedAt',
    userId: 'userId'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    walletAddress?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    totalEarnings?: FloatFilter<"User"> | number
    tasksCompleted?: IntFilter<"User"> | number
    accuracyRate?: FloatFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tasks?: TaskListRelationFilter
    datasets?: DatasetListRelationFilter
    labels?: LabelListRelationFilter
    payouts?: PayoutListRelationFilter
    transactions?: TransactionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    isActive?: SortOrder
    totalEarnings?: SortOrder
    tasksCompleted?: SortOrder
    accuracyRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tasks?: TaskOrderByRelationAggregateInput
    datasets?: DatasetOrderByRelationAggregateInput
    labels?: LabelOrderByRelationAggregateInput
    payouts?: PayoutOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    walletAddress?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    totalEarnings?: FloatFilter<"User"> | number
    tasksCompleted?: IntFilter<"User"> | number
    accuracyRate?: FloatFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    tasks?: TaskListRelationFilter
    datasets?: DatasetListRelationFilter
    labels?: LabelListRelationFilter
    payouts?: PayoutListRelationFilter
    transactions?: TransactionListRelationFilter
  }, "id" | "email" | "walletAddress">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    isActive?: SortOrder
    totalEarnings?: SortOrder
    tasksCompleted?: SortOrder
    accuracyRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    walletAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    totalEarnings?: FloatWithAggregatesFilter<"User"> | number
    tasksCompleted?: IntWithAggregatesFilter<"User"> | number
    accuracyRate?: FloatWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DatasetWhereInput = {
    AND?: DatasetWhereInput | DatasetWhereInput[]
    OR?: DatasetWhereInput[]
    NOT?: DatasetWhereInput | DatasetWhereInput[]
    id?: UuidFilter<"Dataset"> | string
    name?: StringFilter<"Dataset"> | string
    description?: StringNullableFilter<"Dataset"> | string | null
    format?: StringFilter<"Dataset"> | string
    filePath?: StringFilter<"Dataset"> | string
    totalRecords?: IntFilter<"Dataset"> | number
    labeledRecords?: IntFilter<"Dataset"> | number
    labelType?: StringFilter<"Dataset"> | string
    labelOptions?: JsonNullableFilter<"Dataset">
    labelSchema?: JsonNullableFilter<"Dataset">
    totalRewardSOL?: FloatFilter<"Dataset"> | number
    rewardPerRecord?: FloatFilter<"Dataset"> | number
    maxLabelsPerRecord?: IntFilter<"Dataset"> | number
    consensusThreshold?: FloatFilter<"Dataset"> | number
    schema?: JsonNullableFilter<"Dataset">
    validationRules?: JsonNullableFilter<"Dataset">
    isActive?: BoolFilter<"Dataset"> | boolean
    createdAt?: DateTimeFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeFilter<"Dataset"> | Date | string
    createdById?: UuidFilter<"Dataset"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    tasks?: TaskListRelationFilter
    records?: DataRecordListRelationFilter
    payouts?: PayoutListRelationFilter
  }

  export type DatasetOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    format?: SortOrder
    filePath?: SortOrder
    totalRecords?: SortOrder
    labeledRecords?: SortOrder
    labelType?: SortOrder
    labelOptions?: SortOrderInput | SortOrder
    labelSchema?: SortOrderInput | SortOrder
    totalRewardSOL?: SortOrder
    rewardPerRecord?: SortOrder
    maxLabelsPerRecord?: SortOrder
    consensusThreshold?: SortOrder
    schema?: SortOrderInput | SortOrder
    validationRules?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
    records?: DataRecordOrderByRelationAggregateInput
    payouts?: PayoutOrderByRelationAggregateInput
  }

  export type DatasetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DatasetWhereInput | DatasetWhereInput[]
    OR?: DatasetWhereInput[]
    NOT?: DatasetWhereInput | DatasetWhereInput[]
    name?: StringFilter<"Dataset"> | string
    description?: StringNullableFilter<"Dataset"> | string | null
    format?: StringFilter<"Dataset"> | string
    filePath?: StringFilter<"Dataset"> | string
    totalRecords?: IntFilter<"Dataset"> | number
    labeledRecords?: IntFilter<"Dataset"> | number
    labelType?: StringFilter<"Dataset"> | string
    labelOptions?: JsonNullableFilter<"Dataset">
    labelSchema?: JsonNullableFilter<"Dataset">
    totalRewardSOL?: FloatFilter<"Dataset"> | number
    rewardPerRecord?: FloatFilter<"Dataset"> | number
    maxLabelsPerRecord?: IntFilter<"Dataset"> | number
    consensusThreshold?: FloatFilter<"Dataset"> | number
    schema?: JsonNullableFilter<"Dataset">
    validationRules?: JsonNullableFilter<"Dataset">
    isActive?: BoolFilter<"Dataset"> | boolean
    createdAt?: DateTimeFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeFilter<"Dataset"> | Date | string
    createdById?: UuidFilter<"Dataset"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    tasks?: TaskListRelationFilter
    records?: DataRecordListRelationFilter
    payouts?: PayoutListRelationFilter
  }, "id">

  export type DatasetOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    format?: SortOrder
    filePath?: SortOrder
    totalRecords?: SortOrder
    labeledRecords?: SortOrder
    labelType?: SortOrder
    labelOptions?: SortOrderInput | SortOrder
    labelSchema?: SortOrderInput | SortOrder
    totalRewardSOL?: SortOrder
    rewardPerRecord?: SortOrder
    maxLabelsPerRecord?: SortOrder
    consensusThreshold?: SortOrder
    schema?: SortOrderInput | SortOrder
    validationRules?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    _count?: DatasetCountOrderByAggregateInput
    _avg?: DatasetAvgOrderByAggregateInput
    _max?: DatasetMaxOrderByAggregateInput
    _min?: DatasetMinOrderByAggregateInput
    _sum?: DatasetSumOrderByAggregateInput
  }

  export type DatasetScalarWhereWithAggregatesInput = {
    AND?: DatasetScalarWhereWithAggregatesInput | DatasetScalarWhereWithAggregatesInput[]
    OR?: DatasetScalarWhereWithAggregatesInput[]
    NOT?: DatasetScalarWhereWithAggregatesInput | DatasetScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Dataset"> | string
    name?: StringWithAggregatesFilter<"Dataset"> | string
    description?: StringNullableWithAggregatesFilter<"Dataset"> | string | null
    format?: StringWithAggregatesFilter<"Dataset"> | string
    filePath?: StringWithAggregatesFilter<"Dataset"> | string
    totalRecords?: IntWithAggregatesFilter<"Dataset"> | number
    labeledRecords?: IntWithAggregatesFilter<"Dataset"> | number
    labelType?: StringWithAggregatesFilter<"Dataset"> | string
    labelOptions?: JsonNullableWithAggregatesFilter<"Dataset">
    labelSchema?: JsonNullableWithAggregatesFilter<"Dataset">
    totalRewardSOL?: FloatWithAggregatesFilter<"Dataset"> | number
    rewardPerRecord?: FloatWithAggregatesFilter<"Dataset"> | number
    maxLabelsPerRecord?: IntWithAggregatesFilter<"Dataset"> | number
    consensusThreshold?: FloatWithAggregatesFilter<"Dataset"> | number
    schema?: JsonNullableWithAggregatesFilter<"Dataset">
    validationRules?: JsonNullableWithAggregatesFilter<"Dataset">
    isActive?: BoolWithAggregatesFilter<"Dataset"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Dataset"> | Date | string
    createdById?: UuidWithAggregatesFilter<"Dataset"> | string
  }

  export type DataRecordWhereInput = {
    AND?: DataRecordWhereInput | DataRecordWhereInput[]
    OR?: DataRecordWhereInput[]
    NOT?: DataRecordWhereInput | DataRecordWhereInput[]
    id?: UuidFilter<"DataRecord"> | string
    recordNumber?: IntFilter<"DataRecord"> | number
    rawData?: JsonFilter<"DataRecord">
    isLabeled?: BoolFilter<"DataRecord"> | boolean
    createdAt?: DateTimeFilter<"DataRecord"> | Date | string
    updatedAt?: DateTimeFilter<"DataRecord"> | Date | string
    datasetId?: UuidFilter<"DataRecord"> | string
    dataset?: XOR<DatasetScalarRelationFilter, DatasetWhereInput>
    tasks?: TaskListRelationFilter
    labels?: LabelListRelationFilter
  }

  export type DataRecordOrderByWithRelationInput = {
    id?: SortOrder
    recordNumber?: SortOrder
    rawData?: SortOrder
    isLabeled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    datasetId?: SortOrder
    dataset?: DatasetOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
    labels?: LabelOrderByRelationAggregateInput
  }

  export type DataRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    datasetId_recordNumber?: DataRecordDatasetIdRecordNumberCompoundUniqueInput
    AND?: DataRecordWhereInput | DataRecordWhereInput[]
    OR?: DataRecordWhereInput[]
    NOT?: DataRecordWhereInput | DataRecordWhereInput[]
    recordNumber?: IntFilter<"DataRecord"> | number
    rawData?: JsonFilter<"DataRecord">
    isLabeled?: BoolFilter<"DataRecord"> | boolean
    createdAt?: DateTimeFilter<"DataRecord"> | Date | string
    updatedAt?: DateTimeFilter<"DataRecord"> | Date | string
    datasetId?: UuidFilter<"DataRecord"> | string
    dataset?: XOR<DatasetScalarRelationFilter, DatasetWhereInput>
    tasks?: TaskListRelationFilter
    labels?: LabelListRelationFilter
  }, "id" | "datasetId_recordNumber">

  export type DataRecordOrderByWithAggregationInput = {
    id?: SortOrder
    recordNumber?: SortOrder
    rawData?: SortOrder
    isLabeled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    datasetId?: SortOrder
    _count?: DataRecordCountOrderByAggregateInput
    _avg?: DataRecordAvgOrderByAggregateInput
    _max?: DataRecordMaxOrderByAggregateInput
    _min?: DataRecordMinOrderByAggregateInput
    _sum?: DataRecordSumOrderByAggregateInput
  }

  export type DataRecordScalarWhereWithAggregatesInput = {
    AND?: DataRecordScalarWhereWithAggregatesInput | DataRecordScalarWhereWithAggregatesInput[]
    OR?: DataRecordScalarWhereWithAggregatesInput[]
    NOT?: DataRecordScalarWhereWithAggregatesInput | DataRecordScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"DataRecord"> | string
    recordNumber?: IntWithAggregatesFilter<"DataRecord"> | number
    rawData?: JsonWithAggregatesFilter<"DataRecord">
    isLabeled?: BoolWithAggregatesFilter<"DataRecord"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"DataRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DataRecord"> | Date | string
    datasetId?: UuidWithAggregatesFilter<"DataRecord"> | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: UuidFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    reward?: FloatFilter<"Task"> | number
    requiredLabels?: IntFilter<"Task"> | number
    submittedLabels?: IntFilter<"Task"> | number
    consensusThreshold?: FloatFilter<"Task"> | number
    metadata?: JsonNullableFilter<"Task">
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    datasetId?: UuidFilter<"Task"> | string
    recordId?: UuidNullableFilter<"Task"> | string | null
    assignedToId?: UuidNullableFilter<"Task"> | string | null
    dataset?: XOR<DatasetScalarRelationFilter, DatasetWhereInput>
    record?: XOR<DataRecordNullableScalarRelationFilter, DataRecordWhereInput> | null
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    labels?: LabelListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    reward?: SortOrder
    requiredLabels?: SortOrder
    submittedLabels?: SortOrder
    consensusThreshold?: SortOrder
    metadata?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    datasetId?: SortOrder
    recordId?: SortOrderInput | SortOrder
    assignedToId?: SortOrderInput | SortOrder
    dataset?: DatasetOrderByWithRelationInput
    record?: DataRecordOrderByWithRelationInput
    assignedTo?: UserOrderByWithRelationInput
    labels?: LabelOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    reward?: FloatFilter<"Task"> | number
    requiredLabels?: IntFilter<"Task"> | number
    submittedLabels?: IntFilter<"Task"> | number
    consensusThreshold?: FloatFilter<"Task"> | number
    metadata?: JsonNullableFilter<"Task">
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    datasetId?: UuidFilter<"Task"> | string
    recordId?: UuidNullableFilter<"Task"> | string | null
    assignedToId?: UuidNullableFilter<"Task"> | string | null
    dataset?: XOR<DatasetScalarRelationFilter, DatasetWhereInput>
    record?: XOR<DataRecordNullableScalarRelationFilter, DataRecordWhereInput> | null
    assignedTo?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    labels?: LabelListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    reward?: SortOrder
    requiredLabels?: SortOrder
    submittedLabels?: SortOrder
    consensusThreshold?: SortOrder
    metadata?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    datasetId?: SortOrder
    recordId?: SortOrderInput | SortOrder
    assignedToId?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringWithAggregatesFilter<"Task"> | string
    status?: StringWithAggregatesFilter<"Task"> | string
    reward?: FloatWithAggregatesFilter<"Task"> | number
    requiredLabels?: IntWithAggregatesFilter<"Task"> | number
    submittedLabels?: IntWithAggregatesFilter<"Task"> | number
    consensusThreshold?: FloatWithAggregatesFilter<"Task"> | number
    metadata?: JsonNullableWithAggregatesFilter<"Task">
    completedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    datasetId?: UuidWithAggregatesFilter<"Task"> | string
    recordId?: UuidNullableWithAggregatesFilter<"Task"> | string | null
    assignedToId?: UuidNullableWithAggregatesFilter<"Task"> | string | null
  }

  export type LabelWhereInput = {
    AND?: LabelWhereInput | LabelWhereInput[]
    OR?: LabelWhereInput[]
    NOT?: LabelWhereInput | LabelWhereInput[]
    id?: UuidFilter<"Label"> | string
    value?: StringFilter<"Label"> | string
    confidence?: FloatFilter<"Label"> | number
    isAccepted?: BoolFilter<"Label"> | boolean
    isRejected?: BoolFilter<"Label"> | boolean
    rejectionReason?: StringNullableFilter<"Label"> | string | null
    timeSpentSeconds?: IntFilter<"Label"> | number
    metadata?: JsonNullableFilter<"Label">
    createdAt?: DateTimeFilter<"Label"> | Date | string
    taskId?: UuidFilter<"Label"> | string
    recordId?: UuidNullableFilter<"Label"> | string | null
    contributorId?: UuidFilter<"Label"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    record?: XOR<DataRecordNullableScalarRelationFilter, DataRecordWhereInput> | null
    contributor?: XOR<UserScalarRelationFilter, UserWhereInput>
    payout?: XOR<PayoutNullableScalarRelationFilter, PayoutWhereInput> | null
  }

  export type LabelOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    confidence?: SortOrder
    isAccepted?: SortOrder
    isRejected?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    timeSpentSeconds?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    taskId?: SortOrder
    recordId?: SortOrderInput | SortOrder
    contributorId?: SortOrder
    task?: TaskOrderByWithRelationInput
    record?: DataRecordOrderByWithRelationInput
    contributor?: UserOrderByWithRelationInput
    payout?: PayoutOrderByWithRelationInput
  }

  export type LabelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LabelWhereInput | LabelWhereInput[]
    OR?: LabelWhereInput[]
    NOT?: LabelWhereInput | LabelWhereInput[]
    value?: StringFilter<"Label"> | string
    confidence?: FloatFilter<"Label"> | number
    isAccepted?: BoolFilter<"Label"> | boolean
    isRejected?: BoolFilter<"Label"> | boolean
    rejectionReason?: StringNullableFilter<"Label"> | string | null
    timeSpentSeconds?: IntFilter<"Label"> | number
    metadata?: JsonNullableFilter<"Label">
    createdAt?: DateTimeFilter<"Label"> | Date | string
    taskId?: UuidFilter<"Label"> | string
    recordId?: UuidNullableFilter<"Label"> | string | null
    contributorId?: UuidFilter<"Label"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
    record?: XOR<DataRecordNullableScalarRelationFilter, DataRecordWhereInput> | null
    contributor?: XOR<UserScalarRelationFilter, UserWhereInput>
    payout?: XOR<PayoutNullableScalarRelationFilter, PayoutWhereInput> | null
  }, "id">

  export type LabelOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    confidence?: SortOrder
    isAccepted?: SortOrder
    isRejected?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    timeSpentSeconds?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    taskId?: SortOrder
    recordId?: SortOrderInput | SortOrder
    contributorId?: SortOrder
    _count?: LabelCountOrderByAggregateInput
    _avg?: LabelAvgOrderByAggregateInput
    _max?: LabelMaxOrderByAggregateInput
    _min?: LabelMinOrderByAggregateInput
    _sum?: LabelSumOrderByAggregateInput
  }

  export type LabelScalarWhereWithAggregatesInput = {
    AND?: LabelScalarWhereWithAggregatesInput | LabelScalarWhereWithAggregatesInput[]
    OR?: LabelScalarWhereWithAggregatesInput[]
    NOT?: LabelScalarWhereWithAggregatesInput | LabelScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Label"> | string
    value?: StringWithAggregatesFilter<"Label"> | string
    confidence?: FloatWithAggregatesFilter<"Label"> | number
    isAccepted?: BoolWithAggregatesFilter<"Label"> | boolean
    isRejected?: BoolWithAggregatesFilter<"Label"> | boolean
    rejectionReason?: StringNullableWithAggregatesFilter<"Label"> | string | null
    timeSpentSeconds?: IntWithAggregatesFilter<"Label"> | number
    metadata?: JsonNullableWithAggregatesFilter<"Label">
    createdAt?: DateTimeWithAggregatesFilter<"Label"> | Date | string
    taskId?: UuidWithAggregatesFilter<"Label"> | string
    recordId?: UuidNullableWithAggregatesFilter<"Label"> | string | null
    contributorId?: UuidWithAggregatesFilter<"Label"> | string
  }

  export type PayoutWhereInput = {
    AND?: PayoutWhereInput | PayoutWhereInput[]
    OR?: PayoutWhereInput[]
    NOT?: PayoutWhereInput | PayoutWhereInput[]
    id?: UuidFilter<"Payout"> | string
    amountSOL?: FloatFilter<"Payout"> | number
    status?: StringFilter<"Payout"> | string
    txHash?: StringNullableFilter<"Payout"> | string | null
    createdAt?: DateTimeFilter<"Payout"> | Date | string
    updatedAt?: DateTimeFilter<"Payout"> | Date | string
    processedAt?: DateTimeNullableFilter<"Payout"> | Date | string | null
    contributorId?: UuidFilter<"Payout"> | string
    datasetId?: UuidFilter<"Payout"> | string
    labelId?: UuidNullableFilter<"Payout"> | string | null
    contributor?: XOR<UserScalarRelationFilter, UserWhereInput>
    dataset?: XOR<DatasetScalarRelationFilter, DatasetWhereInput>
    label?: XOR<LabelNullableScalarRelationFilter, LabelWhereInput> | null
  }

  export type PayoutOrderByWithRelationInput = {
    id?: SortOrder
    amountSOL?: SortOrder
    status?: SortOrder
    txHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    contributorId?: SortOrder
    datasetId?: SortOrder
    labelId?: SortOrderInput | SortOrder
    contributor?: UserOrderByWithRelationInput
    dataset?: DatasetOrderByWithRelationInput
    label?: LabelOrderByWithRelationInput
  }

  export type PayoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    labelId?: string
    AND?: PayoutWhereInput | PayoutWhereInput[]
    OR?: PayoutWhereInput[]
    NOT?: PayoutWhereInput | PayoutWhereInput[]
    amountSOL?: FloatFilter<"Payout"> | number
    status?: StringFilter<"Payout"> | string
    txHash?: StringNullableFilter<"Payout"> | string | null
    createdAt?: DateTimeFilter<"Payout"> | Date | string
    updatedAt?: DateTimeFilter<"Payout"> | Date | string
    processedAt?: DateTimeNullableFilter<"Payout"> | Date | string | null
    contributorId?: UuidFilter<"Payout"> | string
    datasetId?: UuidFilter<"Payout"> | string
    contributor?: XOR<UserScalarRelationFilter, UserWhereInput>
    dataset?: XOR<DatasetScalarRelationFilter, DatasetWhereInput>
    label?: XOR<LabelNullableScalarRelationFilter, LabelWhereInput> | null
  }, "id" | "labelId">

  export type PayoutOrderByWithAggregationInput = {
    id?: SortOrder
    amountSOL?: SortOrder
    status?: SortOrder
    txHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    contributorId?: SortOrder
    datasetId?: SortOrder
    labelId?: SortOrderInput | SortOrder
    _count?: PayoutCountOrderByAggregateInput
    _avg?: PayoutAvgOrderByAggregateInput
    _max?: PayoutMaxOrderByAggregateInput
    _min?: PayoutMinOrderByAggregateInput
    _sum?: PayoutSumOrderByAggregateInput
  }

  export type PayoutScalarWhereWithAggregatesInput = {
    AND?: PayoutScalarWhereWithAggregatesInput | PayoutScalarWhereWithAggregatesInput[]
    OR?: PayoutScalarWhereWithAggregatesInput[]
    NOT?: PayoutScalarWhereWithAggregatesInput | PayoutScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Payout"> | string
    amountSOL?: FloatWithAggregatesFilter<"Payout"> | number
    status?: StringWithAggregatesFilter<"Payout"> | string
    txHash?: StringNullableWithAggregatesFilter<"Payout"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payout"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payout"> | Date | string
    processedAt?: DateTimeNullableWithAggregatesFilter<"Payout"> | Date | string | null
    contributorId?: UuidWithAggregatesFilter<"Payout"> | string
    datasetId?: UuidWithAggregatesFilter<"Payout"> | string
    labelId?: UuidNullableWithAggregatesFilter<"Payout"> | string | null
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: UuidFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    status?: StringFilter<"Transaction"> | string
    transactionHash?: StringNullableFilter<"Transaction"> | string | null
    toAddress?: StringFilter<"Transaction"> | string
    fromAddress?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    errorMessage?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    completedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    userId?: UuidFilter<"Transaction"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    transactionHash?: SortOrderInput | SortOrder
    toAddress?: SortOrder
    fromAddress?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    amount?: FloatFilter<"Transaction"> | number
    status?: StringFilter<"Transaction"> | string
    transactionHash?: StringNullableFilter<"Transaction"> | string | null
    toAddress?: StringFilter<"Transaction"> | string
    fromAddress?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    errorMessage?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    completedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    userId?: UuidFilter<"Transaction"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    transactionHash?: SortOrderInput | SortOrder
    toAddress?: SortOrder
    fromAddress?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Transaction"> | string
    amount?: FloatWithAggregatesFilter<"Transaction"> | number
    status?: StringWithAggregatesFilter<"Transaction"> | string
    transactionHash?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    toAddress?: StringWithAggregatesFilter<"Transaction"> | string
    fromAddress?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    description?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Transaction">
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Transaction"> | Date | string | null
    userId?: UuidWithAggregatesFilter<"Transaction"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutAssignedToInput
    datasets?: DatasetCreateNestedManyWithoutCreatedByInput
    labels?: LabelCreateNestedManyWithoutContributorInput
    payouts?: PayoutCreateNestedManyWithoutContributorInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutAssignedToInput
    datasets?: DatasetUncheckedCreateNestedManyWithoutCreatedByInput
    labels?: LabelUncheckedCreateNestedManyWithoutContributorInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutContributorInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutAssignedToNestedInput
    datasets?: DatasetUpdateManyWithoutCreatedByNestedInput
    labels?: LabelUpdateManyWithoutContributorNestedInput
    payouts?: PayoutUpdateManyWithoutContributorNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutAssignedToNestedInput
    datasets?: DatasetUncheckedUpdateManyWithoutCreatedByNestedInput
    labels?: LabelUncheckedUpdateManyWithoutContributorNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutContributorNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatasetCreateInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutDatasetsInput
    tasks?: TaskCreateNestedManyWithoutDatasetInput
    records?: DataRecordCreateNestedManyWithoutDatasetInput
    payouts?: PayoutCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    tasks?: TaskUncheckedCreateNestedManyWithoutDatasetInput
    records?: DataRecordUncheckedCreateNestedManyWithoutDatasetInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutDatasetsNestedInput
    tasks?: TaskUpdateManyWithoutDatasetNestedInput
    records?: DataRecordUpdateManyWithoutDatasetNestedInput
    payouts?: PayoutUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutDatasetNestedInput
    records?: DataRecordUncheckedUpdateManyWithoutDatasetNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
  }

  export type DatasetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatasetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
  }

  export type DataRecordCreateInput = {
    id?: string
    recordNumber: number
    rawData: JsonNullValueInput | InputJsonValue
    isLabeled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataset: DatasetCreateNestedOneWithoutRecordsInput
    tasks?: TaskCreateNestedManyWithoutRecordInput
    labels?: LabelCreateNestedManyWithoutRecordInput
  }

  export type DataRecordUncheckedCreateInput = {
    id?: string
    recordNumber: number
    rawData: JsonNullValueInput | InputJsonValue
    isLabeled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
    tasks?: TaskUncheckedCreateNestedManyWithoutRecordInput
    labels?: LabelUncheckedCreateNestedManyWithoutRecordInput
  }

  export type DataRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: DatasetUpdateOneRequiredWithoutRecordsNestedInput
    tasks?: TaskUpdateManyWithoutRecordNestedInput
    labels?: LabelUpdateManyWithoutRecordNestedInput
  }

  export type DataRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutRecordNestedInput
    labels?: LabelUncheckedUpdateManyWithoutRecordNestedInput
  }

  export type DataRecordCreateManyInput = {
    id?: string
    recordNumber: number
    rawData: JsonNullValueInput | InputJsonValue
    isLabeled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
  }

  export type DataRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DataRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dataset: DatasetCreateNestedOneWithoutTasksInput
    record?: DataRecordCreateNestedOneWithoutTasksInput
    assignedTo?: UserCreateNestedOneWithoutTasksInput
    labels?: LabelCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
    recordId?: string | null
    assignedToId?: string | null
    labels?: LabelUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: DatasetUpdateOneRequiredWithoutTasksNestedInput
    record?: DataRecordUpdateOneWithoutTasksNestedInput
    assignedTo?: UserUpdateOneWithoutTasksNestedInput
    labels?: LabelUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: LabelUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
    recordId?: string | null
    assignedToId?: string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LabelCreateInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutLabelsInput
    record?: DataRecordCreateNestedOneWithoutLabelsInput
    contributor: UserCreateNestedOneWithoutLabelsInput
    payout?: PayoutCreateNestedOneWithoutLabelInput
  }

  export type LabelUncheckedCreateInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    taskId: string
    recordId?: string | null
    contributorId: string
    payout?: PayoutUncheckedCreateNestedOneWithoutLabelInput
  }

  export type LabelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutLabelsNestedInput
    record?: DataRecordUpdateOneWithoutLabelsNestedInput
    contributor?: UserUpdateOneRequiredWithoutLabelsNestedInput
    payout?: PayoutUpdateOneWithoutLabelNestedInput
  }

  export type LabelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    contributorId?: StringFieldUpdateOperationsInput | string
    payout?: PayoutUncheckedUpdateOneWithoutLabelNestedInput
  }

  export type LabelCreateManyInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    taskId: string
    recordId?: string | null
    contributorId: string
  }

  export type LabelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    contributorId?: StringFieldUpdateOperationsInput | string
  }

  export type PayoutCreateInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    contributor: UserCreateNestedOneWithoutPayoutsInput
    dataset: DatasetCreateNestedOneWithoutPayoutsInput
    label?: LabelCreateNestedOneWithoutPayoutInput
  }

  export type PayoutUncheckedCreateInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    contributorId: string
    datasetId: string
    labelId?: string | null
  }

  export type PayoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contributor?: UserUpdateOneRequiredWithoutPayoutsNestedInput
    dataset?: DatasetUpdateOneRequiredWithoutPayoutsNestedInput
    label?: LabelUpdateOneWithoutPayoutNestedInput
  }

  export type PayoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contributorId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    labelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayoutCreateManyInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    contributorId: string
    datasetId: string
    labelId?: string | null
  }

  export type PayoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PayoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contributorId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
    labelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionCreateInput = {
    id?: string
    amount: number
    status?: string
    transactionHash?: string | null
    toAddress: string
    fromAddress?: string | null
    description?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    amount: number
    status?: string
    transactionHash?: string | null
    toAddress: string
    fromAddress?: string | null
    description?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
    userId: string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    amount: number
    status?: string
    transactionHash?: string | null
    toAddress: string
    fromAddress?: string | null
    description?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
    userId: string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type DatasetListRelationFilter = {
    every?: DatasetWhereInput
    some?: DatasetWhereInput
    none?: DatasetWhereInput
  }

  export type LabelListRelationFilter = {
    every?: LabelWhereInput
    some?: LabelWhereInput
    none?: LabelWhereInput
  }

  export type PayoutListRelationFilter = {
    every?: PayoutWhereInput
    some?: PayoutWhereInput
    none?: PayoutWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DatasetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LabelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PayoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    totalEarnings?: SortOrder
    tasksCompleted?: SortOrder
    accuracyRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    totalEarnings?: SortOrder
    tasksCompleted?: SortOrder
    accuracyRate?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    totalEarnings?: SortOrder
    tasksCompleted?: SortOrder
    accuracyRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    totalEarnings?: SortOrder
    tasksCompleted?: SortOrder
    accuracyRate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    totalEarnings?: SortOrder
    tasksCompleted?: SortOrder
    accuracyRate?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DataRecordListRelationFilter = {
    every?: DataRecordWhereInput
    some?: DataRecordWhereInput
    none?: DataRecordWhereInput
  }

  export type DataRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DatasetCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    format?: SortOrder
    filePath?: SortOrder
    totalRecords?: SortOrder
    labeledRecords?: SortOrder
    labelType?: SortOrder
    labelOptions?: SortOrder
    labelSchema?: SortOrder
    totalRewardSOL?: SortOrder
    rewardPerRecord?: SortOrder
    maxLabelsPerRecord?: SortOrder
    consensusThreshold?: SortOrder
    schema?: SortOrder
    validationRules?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type DatasetAvgOrderByAggregateInput = {
    totalRecords?: SortOrder
    labeledRecords?: SortOrder
    totalRewardSOL?: SortOrder
    rewardPerRecord?: SortOrder
    maxLabelsPerRecord?: SortOrder
    consensusThreshold?: SortOrder
  }

  export type DatasetMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    format?: SortOrder
    filePath?: SortOrder
    totalRecords?: SortOrder
    labeledRecords?: SortOrder
    labelType?: SortOrder
    totalRewardSOL?: SortOrder
    rewardPerRecord?: SortOrder
    maxLabelsPerRecord?: SortOrder
    consensusThreshold?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type DatasetMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    format?: SortOrder
    filePath?: SortOrder
    totalRecords?: SortOrder
    labeledRecords?: SortOrder
    labelType?: SortOrder
    totalRewardSOL?: SortOrder
    rewardPerRecord?: SortOrder
    maxLabelsPerRecord?: SortOrder
    consensusThreshold?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type DatasetSumOrderByAggregateInput = {
    totalRecords?: SortOrder
    labeledRecords?: SortOrder
    totalRewardSOL?: SortOrder
    rewardPerRecord?: SortOrder
    maxLabelsPerRecord?: SortOrder
    consensusThreshold?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DatasetScalarRelationFilter = {
    is?: DatasetWhereInput
    isNot?: DatasetWhereInput
  }

  export type DataRecordDatasetIdRecordNumberCompoundUniqueInput = {
    datasetId: string
    recordNumber: number
  }

  export type DataRecordCountOrderByAggregateInput = {
    id?: SortOrder
    recordNumber?: SortOrder
    rawData?: SortOrder
    isLabeled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    datasetId?: SortOrder
  }

  export type DataRecordAvgOrderByAggregateInput = {
    recordNumber?: SortOrder
  }

  export type DataRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    recordNumber?: SortOrder
    isLabeled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    datasetId?: SortOrder
  }

  export type DataRecordMinOrderByAggregateInput = {
    id?: SortOrder
    recordNumber?: SortOrder
    isLabeled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    datasetId?: SortOrder
  }

  export type DataRecordSumOrderByAggregateInput = {
    recordNumber?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type DataRecordNullableScalarRelationFilter = {
    is?: DataRecordWhereInput | null
    isNot?: DataRecordWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    reward?: SortOrder
    requiredLabels?: SortOrder
    submittedLabels?: SortOrder
    consensusThreshold?: SortOrder
    metadata?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    datasetId?: SortOrder
    recordId?: SortOrder
    assignedToId?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    reward?: SortOrder
    requiredLabels?: SortOrder
    submittedLabels?: SortOrder
    consensusThreshold?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    reward?: SortOrder
    requiredLabels?: SortOrder
    submittedLabels?: SortOrder
    consensusThreshold?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    datasetId?: SortOrder
    recordId?: SortOrder
    assignedToId?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    reward?: SortOrder
    requiredLabels?: SortOrder
    submittedLabels?: SortOrder
    consensusThreshold?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    datasetId?: SortOrder
    recordId?: SortOrder
    assignedToId?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    reward?: SortOrder
    requiredLabels?: SortOrder
    submittedLabels?: SortOrder
    consensusThreshold?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type PayoutNullableScalarRelationFilter = {
    is?: PayoutWhereInput | null
    isNot?: PayoutWhereInput | null
  }

  export type LabelCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    confidence?: SortOrder
    isAccepted?: SortOrder
    isRejected?: SortOrder
    rejectionReason?: SortOrder
    timeSpentSeconds?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    taskId?: SortOrder
    recordId?: SortOrder
    contributorId?: SortOrder
  }

  export type LabelAvgOrderByAggregateInput = {
    confidence?: SortOrder
    timeSpentSeconds?: SortOrder
  }

  export type LabelMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    confidence?: SortOrder
    isAccepted?: SortOrder
    isRejected?: SortOrder
    rejectionReason?: SortOrder
    timeSpentSeconds?: SortOrder
    createdAt?: SortOrder
    taskId?: SortOrder
    recordId?: SortOrder
    contributorId?: SortOrder
  }

  export type LabelMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    confidence?: SortOrder
    isAccepted?: SortOrder
    isRejected?: SortOrder
    rejectionReason?: SortOrder
    timeSpentSeconds?: SortOrder
    createdAt?: SortOrder
    taskId?: SortOrder
    recordId?: SortOrder
    contributorId?: SortOrder
  }

  export type LabelSumOrderByAggregateInput = {
    confidence?: SortOrder
    timeSpentSeconds?: SortOrder
  }

  export type LabelNullableScalarRelationFilter = {
    is?: LabelWhereInput | null
    isNot?: LabelWhereInput | null
  }

  export type PayoutCountOrderByAggregateInput = {
    id?: SortOrder
    amountSOL?: SortOrder
    status?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    processedAt?: SortOrder
    contributorId?: SortOrder
    datasetId?: SortOrder
    labelId?: SortOrder
  }

  export type PayoutAvgOrderByAggregateInput = {
    amountSOL?: SortOrder
  }

  export type PayoutMaxOrderByAggregateInput = {
    id?: SortOrder
    amountSOL?: SortOrder
    status?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    processedAt?: SortOrder
    contributorId?: SortOrder
    datasetId?: SortOrder
    labelId?: SortOrder
  }

  export type PayoutMinOrderByAggregateInput = {
    id?: SortOrder
    amountSOL?: SortOrder
    status?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    processedAt?: SortOrder
    contributorId?: SortOrder
    datasetId?: SortOrder
    labelId?: SortOrder
  }

  export type PayoutSumOrderByAggregateInput = {
    amountSOL?: SortOrder
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    transactionHash?: SortOrder
    toAddress?: SortOrder
    fromAddress?: SortOrder
    description?: SortOrder
    errorMessage?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
    userId?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    transactionHash?: SortOrder
    toAddress?: SortOrder
    fromAddress?: SortOrder
    description?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
    userId?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    transactionHash?: SortOrder
    toAddress?: SortOrder
    fromAddress?: SortOrder
    description?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
    userId?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TaskCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<TaskCreateWithoutAssignedToInput, TaskUncheckedCreateWithoutAssignedToInput> | TaskCreateWithoutAssignedToInput[] | TaskUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssignedToInput | TaskCreateOrConnectWithoutAssignedToInput[]
    createMany?: TaskCreateManyAssignedToInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type DatasetCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<DatasetCreateWithoutCreatedByInput, DatasetUncheckedCreateWithoutCreatedByInput> | DatasetCreateWithoutCreatedByInput[] | DatasetUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DatasetCreateOrConnectWithoutCreatedByInput | DatasetCreateOrConnectWithoutCreatedByInput[]
    createMany?: DatasetCreateManyCreatedByInputEnvelope
    connect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
  }

  export type LabelCreateNestedManyWithoutContributorInput = {
    create?: XOR<LabelCreateWithoutContributorInput, LabelUncheckedCreateWithoutContributorInput> | LabelCreateWithoutContributorInput[] | LabelUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutContributorInput | LabelCreateOrConnectWithoutContributorInput[]
    createMany?: LabelCreateManyContributorInputEnvelope
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
  }

  export type PayoutCreateNestedManyWithoutContributorInput = {
    create?: XOR<PayoutCreateWithoutContributorInput, PayoutUncheckedCreateWithoutContributorInput> | PayoutCreateWithoutContributorInput[] | PayoutUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutContributorInput | PayoutCreateOrConnectWithoutContributorInput[]
    createMany?: PayoutCreateManyContributorInputEnvelope
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<TaskCreateWithoutAssignedToInput, TaskUncheckedCreateWithoutAssignedToInput> | TaskCreateWithoutAssignedToInput[] | TaskUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssignedToInput | TaskCreateOrConnectWithoutAssignedToInput[]
    createMany?: TaskCreateManyAssignedToInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type DatasetUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<DatasetCreateWithoutCreatedByInput, DatasetUncheckedCreateWithoutCreatedByInput> | DatasetCreateWithoutCreatedByInput[] | DatasetUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DatasetCreateOrConnectWithoutCreatedByInput | DatasetCreateOrConnectWithoutCreatedByInput[]
    createMany?: DatasetCreateManyCreatedByInputEnvelope
    connect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
  }

  export type LabelUncheckedCreateNestedManyWithoutContributorInput = {
    create?: XOR<LabelCreateWithoutContributorInput, LabelUncheckedCreateWithoutContributorInput> | LabelCreateWithoutContributorInput[] | LabelUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutContributorInput | LabelCreateOrConnectWithoutContributorInput[]
    createMany?: LabelCreateManyContributorInputEnvelope
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
  }

  export type PayoutUncheckedCreateNestedManyWithoutContributorInput = {
    create?: XOR<PayoutCreateWithoutContributorInput, PayoutUncheckedCreateWithoutContributorInput> | PayoutCreateWithoutContributorInput[] | PayoutUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutContributorInput | PayoutCreateOrConnectWithoutContributorInput[]
    createMany?: PayoutCreateManyContributorInputEnvelope
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TaskUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<TaskCreateWithoutAssignedToInput, TaskUncheckedCreateWithoutAssignedToInput> | TaskCreateWithoutAssignedToInput[] | TaskUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssignedToInput | TaskCreateOrConnectWithoutAssignedToInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutAssignedToInput | TaskUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: TaskCreateManyAssignedToInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutAssignedToInput | TaskUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutAssignedToInput | TaskUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type DatasetUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<DatasetCreateWithoutCreatedByInput, DatasetUncheckedCreateWithoutCreatedByInput> | DatasetCreateWithoutCreatedByInput[] | DatasetUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DatasetCreateOrConnectWithoutCreatedByInput | DatasetCreateOrConnectWithoutCreatedByInput[]
    upsert?: DatasetUpsertWithWhereUniqueWithoutCreatedByInput | DatasetUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: DatasetCreateManyCreatedByInputEnvelope
    set?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    disconnect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    delete?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    connect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    update?: DatasetUpdateWithWhereUniqueWithoutCreatedByInput | DatasetUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: DatasetUpdateManyWithWhereWithoutCreatedByInput | DatasetUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: DatasetScalarWhereInput | DatasetScalarWhereInput[]
  }

  export type LabelUpdateManyWithoutContributorNestedInput = {
    create?: XOR<LabelCreateWithoutContributorInput, LabelUncheckedCreateWithoutContributorInput> | LabelCreateWithoutContributorInput[] | LabelUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutContributorInput | LabelCreateOrConnectWithoutContributorInput[]
    upsert?: LabelUpsertWithWhereUniqueWithoutContributorInput | LabelUpsertWithWhereUniqueWithoutContributorInput[]
    createMany?: LabelCreateManyContributorInputEnvelope
    set?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    disconnect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    delete?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    update?: LabelUpdateWithWhereUniqueWithoutContributorInput | LabelUpdateWithWhereUniqueWithoutContributorInput[]
    updateMany?: LabelUpdateManyWithWhereWithoutContributorInput | LabelUpdateManyWithWhereWithoutContributorInput[]
    deleteMany?: LabelScalarWhereInput | LabelScalarWhereInput[]
  }

  export type PayoutUpdateManyWithoutContributorNestedInput = {
    create?: XOR<PayoutCreateWithoutContributorInput, PayoutUncheckedCreateWithoutContributorInput> | PayoutCreateWithoutContributorInput[] | PayoutUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutContributorInput | PayoutCreateOrConnectWithoutContributorInput[]
    upsert?: PayoutUpsertWithWhereUniqueWithoutContributorInput | PayoutUpsertWithWhereUniqueWithoutContributorInput[]
    createMany?: PayoutCreateManyContributorInputEnvelope
    set?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    disconnect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    delete?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    update?: PayoutUpdateWithWhereUniqueWithoutContributorInput | PayoutUpdateWithWhereUniqueWithoutContributorInput[]
    updateMany?: PayoutUpdateManyWithWhereWithoutContributorInput | PayoutUpdateManyWithWhereWithoutContributorInput[]
    deleteMany?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<TaskCreateWithoutAssignedToInput, TaskUncheckedCreateWithoutAssignedToInput> | TaskCreateWithoutAssignedToInput[] | TaskUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutAssignedToInput | TaskCreateOrConnectWithoutAssignedToInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutAssignedToInput | TaskUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: TaskCreateManyAssignedToInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutAssignedToInput | TaskUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutAssignedToInput | TaskUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type DatasetUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<DatasetCreateWithoutCreatedByInput, DatasetUncheckedCreateWithoutCreatedByInput> | DatasetCreateWithoutCreatedByInput[] | DatasetUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: DatasetCreateOrConnectWithoutCreatedByInput | DatasetCreateOrConnectWithoutCreatedByInput[]
    upsert?: DatasetUpsertWithWhereUniqueWithoutCreatedByInput | DatasetUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: DatasetCreateManyCreatedByInputEnvelope
    set?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    disconnect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    delete?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    connect?: DatasetWhereUniqueInput | DatasetWhereUniqueInput[]
    update?: DatasetUpdateWithWhereUniqueWithoutCreatedByInput | DatasetUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: DatasetUpdateManyWithWhereWithoutCreatedByInput | DatasetUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: DatasetScalarWhereInput | DatasetScalarWhereInput[]
  }

  export type LabelUncheckedUpdateManyWithoutContributorNestedInput = {
    create?: XOR<LabelCreateWithoutContributorInput, LabelUncheckedCreateWithoutContributorInput> | LabelCreateWithoutContributorInput[] | LabelUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutContributorInput | LabelCreateOrConnectWithoutContributorInput[]
    upsert?: LabelUpsertWithWhereUniqueWithoutContributorInput | LabelUpsertWithWhereUniqueWithoutContributorInput[]
    createMany?: LabelCreateManyContributorInputEnvelope
    set?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    disconnect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    delete?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    update?: LabelUpdateWithWhereUniqueWithoutContributorInput | LabelUpdateWithWhereUniqueWithoutContributorInput[]
    updateMany?: LabelUpdateManyWithWhereWithoutContributorInput | LabelUpdateManyWithWhereWithoutContributorInput[]
    deleteMany?: LabelScalarWhereInput | LabelScalarWhereInput[]
  }

  export type PayoutUncheckedUpdateManyWithoutContributorNestedInput = {
    create?: XOR<PayoutCreateWithoutContributorInput, PayoutUncheckedCreateWithoutContributorInput> | PayoutCreateWithoutContributorInput[] | PayoutUncheckedCreateWithoutContributorInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutContributorInput | PayoutCreateOrConnectWithoutContributorInput[]
    upsert?: PayoutUpsertWithWhereUniqueWithoutContributorInput | PayoutUpsertWithWhereUniqueWithoutContributorInput[]
    createMany?: PayoutCreateManyContributorInputEnvelope
    set?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    disconnect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    delete?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    update?: PayoutUpdateWithWhereUniqueWithoutContributorInput | PayoutUpdateWithWhereUniqueWithoutContributorInput[]
    updateMany?: PayoutUpdateManyWithWhereWithoutContributorInput | PayoutUpdateManyWithWhereWithoutContributorInput[]
    deleteMany?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDatasetsInput = {
    create?: XOR<UserCreateWithoutDatasetsInput, UserUncheckedCreateWithoutDatasetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDatasetsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutDatasetInput = {
    create?: XOR<TaskCreateWithoutDatasetInput, TaskUncheckedCreateWithoutDatasetInput> | TaskCreateWithoutDatasetInput[] | TaskUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutDatasetInput | TaskCreateOrConnectWithoutDatasetInput[]
    createMany?: TaskCreateManyDatasetInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type DataRecordCreateNestedManyWithoutDatasetInput = {
    create?: XOR<DataRecordCreateWithoutDatasetInput, DataRecordUncheckedCreateWithoutDatasetInput> | DataRecordCreateWithoutDatasetInput[] | DataRecordUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: DataRecordCreateOrConnectWithoutDatasetInput | DataRecordCreateOrConnectWithoutDatasetInput[]
    createMany?: DataRecordCreateManyDatasetInputEnvelope
    connect?: DataRecordWhereUniqueInput | DataRecordWhereUniqueInput[]
  }

  export type PayoutCreateNestedManyWithoutDatasetInput = {
    create?: XOR<PayoutCreateWithoutDatasetInput, PayoutUncheckedCreateWithoutDatasetInput> | PayoutCreateWithoutDatasetInput[] | PayoutUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutDatasetInput | PayoutCreateOrConnectWithoutDatasetInput[]
    createMany?: PayoutCreateManyDatasetInputEnvelope
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutDatasetInput = {
    create?: XOR<TaskCreateWithoutDatasetInput, TaskUncheckedCreateWithoutDatasetInput> | TaskCreateWithoutDatasetInput[] | TaskUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutDatasetInput | TaskCreateOrConnectWithoutDatasetInput[]
    createMany?: TaskCreateManyDatasetInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type DataRecordUncheckedCreateNestedManyWithoutDatasetInput = {
    create?: XOR<DataRecordCreateWithoutDatasetInput, DataRecordUncheckedCreateWithoutDatasetInput> | DataRecordCreateWithoutDatasetInput[] | DataRecordUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: DataRecordCreateOrConnectWithoutDatasetInput | DataRecordCreateOrConnectWithoutDatasetInput[]
    createMany?: DataRecordCreateManyDatasetInputEnvelope
    connect?: DataRecordWhereUniqueInput | DataRecordWhereUniqueInput[]
  }

  export type PayoutUncheckedCreateNestedManyWithoutDatasetInput = {
    create?: XOR<PayoutCreateWithoutDatasetInput, PayoutUncheckedCreateWithoutDatasetInput> | PayoutCreateWithoutDatasetInput[] | PayoutUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutDatasetInput | PayoutCreateOrConnectWithoutDatasetInput[]
    createMany?: PayoutCreateManyDatasetInputEnvelope
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDatasetsNestedInput = {
    create?: XOR<UserCreateWithoutDatasetsInput, UserUncheckedCreateWithoutDatasetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDatasetsInput
    upsert?: UserUpsertWithoutDatasetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDatasetsInput, UserUpdateWithoutDatasetsInput>, UserUncheckedUpdateWithoutDatasetsInput>
  }

  export type TaskUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<TaskCreateWithoutDatasetInput, TaskUncheckedCreateWithoutDatasetInput> | TaskCreateWithoutDatasetInput[] | TaskUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutDatasetInput | TaskCreateOrConnectWithoutDatasetInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutDatasetInput | TaskUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: TaskCreateManyDatasetInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutDatasetInput | TaskUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutDatasetInput | TaskUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type DataRecordUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<DataRecordCreateWithoutDatasetInput, DataRecordUncheckedCreateWithoutDatasetInput> | DataRecordCreateWithoutDatasetInput[] | DataRecordUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: DataRecordCreateOrConnectWithoutDatasetInput | DataRecordCreateOrConnectWithoutDatasetInput[]
    upsert?: DataRecordUpsertWithWhereUniqueWithoutDatasetInput | DataRecordUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: DataRecordCreateManyDatasetInputEnvelope
    set?: DataRecordWhereUniqueInput | DataRecordWhereUniqueInput[]
    disconnect?: DataRecordWhereUniqueInput | DataRecordWhereUniqueInput[]
    delete?: DataRecordWhereUniqueInput | DataRecordWhereUniqueInput[]
    connect?: DataRecordWhereUniqueInput | DataRecordWhereUniqueInput[]
    update?: DataRecordUpdateWithWhereUniqueWithoutDatasetInput | DataRecordUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: DataRecordUpdateManyWithWhereWithoutDatasetInput | DataRecordUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: DataRecordScalarWhereInput | DataRecordScalarWhereInput[]
  }

  export type PayoutUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<PayoutCreateWithoutDatasetInput, PayoutUncheckedCreateWithoutDatasetInput> | PayoutCreateWithoutDatasetInput[] | PayoutUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutDatasetInput | PayoutCreateOrConnectWithoutDatasetInput[]
    upsert?: PayoutUpsertWithWhereUniqueWithoutDatasetInput | PayoutUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: PayoutCreateManyDatasetInputEnvelope
    set?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    disconnect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    delete?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    update?: PayoutUpdateWithWhereUniqueWithoutDatasetInput | PayoutUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: PayoutUpdateManyWithWhereWithoutDatasetInput | PayoutUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<TaskCreateWithoutDatasetInput, TaskUncheckedCreateWithoutDatasetInput> | TaskCreateWithoutDatasetInput[] | TaskUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutDatasetInput | TaskCreateOrConnectWithoutDatasetInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutDatasetInput | TaskUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: TaskCreateManyDatasetInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutDatasetInput | TaskUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutDatasetInput | TaskUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type DataRecordUncheckedUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<DataRecordCreateWithoutDatasetInput, DataRecordUncheckedCreateWithoutDatasetInput> | DataRecordCreateWithoutDatasetInput[] | DataRecordUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: DataRecordCreateOrConnectWithoutDatasetInput | DataRecordCreateOrConnectWithoutDatasetInput[]
    upsert?: DataRecordUpsertWithWhereUniqueWithoutDatasetInput | DataRecordUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: DataRecordCreateManyDatasetInputEnvelope
    set?: DataRecordWhereUniqueInput | DataRecordWhereUniqueInput[]
    disconnect?: DataRecordWhereUniqueInput | DataRecordWhereUniqueInput[]
    delete?: DataRecordWhereUniqueInput | DataRecordWhereUniqueInput[]
    connect?: DataRecordWhereUniqueInput | DataRecordWhereUniqueInput[]
    update?: DataRecordUpdateWithWhereUniqueWithoutDatasetInput | DataRecordUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: DataRecordUpdateManyWithWhereWithoutDatasetInput | DataRecordUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: DataRecordScalarWhereInput | DataRecordScalarWhereInput[]
  }

  export type PayoutUncheckedUpdateManyWithoutDatasetNestedInput = {
    create?: XOR<PayoutCreateWithoutDatasetInput, PayoutUncheckedCreateWithoutDatasetInput> | PayoutCreateWithoutDatasetInput[] | PayoutUncheckedCreateWithoutDatasetInput[]
    connectOrCreate?: PayoutCreateOrConnectWithoutDatasetInput | PayoutCreateOrConnectWithoutDatasetInput[]
    upsert?: PayoutUpsertWithWhereUniqueWithoutDatasetInput | PayoutUpsertWithWhereUniqueWithoutDatasetInput[]
    createMany?: PayoutCreateManyDatasetInputEnvelope
    set?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    disconnect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    delete?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    connect?: PayoutWhereUniqueInput | PayoutWhereUniqueInput[]
    update?: PayoutUpdateWithWhereUniqueWithoutDatasetInput | PayoutUpdateWithWhereUniqueWithoutDatasetInput[]
    updateMany?: PayoutUpdateManyWithWhereWithoutDatasetInput | PayoutUpdateManyWithWhereWithoutDatasetInput[]
    deleteMany?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
  }

  export type DatasetCreateNestedOneWithoutRecordsInput = {
    create?: XOR<DatasetCreateWithoutRecordsInput, DatasetUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutRecordsInput
    connect?: DatasetWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutRecordInput = {
    create?: XOR<TaskCreateWithoutRecordInput, TaskUncheckedCreateWithoutRecordInput> | TaskCreateWithoutRecordInput[] | TaskUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutRecordInput | TaskCreateOrConnectWithoutRecordInput[]
    createMany?: TaskCreateManyRecordInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type LabelCreateNestedManyWithoutRecordInput = {
    create?: XOR<LabelCreateWithoutRecordInput, LabelUncheckedCreateWithoutRecordInput> | LabelCreateWithoutRecordInput[] | LabelUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutRecordInput | LabelCreateOrConnectWithoutRecordInput[]
    createMany?: LabelCreateManyRecordInputEnvelope
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutRecordInput = {
    create?: XOR<TaskCreateWithoutRecordInput, TaskUncheckedCreateWithoutRecordInput> | TaskCreateWithoutRecordInput[] | TaskUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutRecordInput | TaskCreateOrConnectWithoutRecordInput[]
    createMany?: TaskCreateManyRecordInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type LabelUncheckedCreateNestedManyWithoutRecordInput = {
    create?: XOR<LabelCreateWithoutRecordInput, LabelUncheckedCreateWithoutRecordInput> | LabelCreateWithoutRecordInput[] | LabelUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutRecordInput | LabelCreateOrConnectWithoutRecordInput[]
    createMany?: LabelCreateManyRecordInputEnvelope
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
  }

  export type DatasetUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<DatasetCreateWithoutRecordsInput, DatasetUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutRecordsInput
    upsert?: DatasetUpsertWithoutRecordsInput
    connect?: DatasetWhereUniqueInput
    update?: XOR<XOR<DatasetUpdateToOneWithWhereWithoutRecordsInput, DatasetUpdateWithoutRecordsInput>, DatasetUncheckedUpdateWithoutRecordsInput>
  }

  export type TaskUpdateManyWithoutRecordNestedInput = {
    create?: XOR<TaskCreateWithoutRecordInput, TaskUncheckedCreateWithoutRecordInput> | TaskCreateWithoutRecordInput[] | TaskUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutRecordInput | TaskCreateOrConnectWithoutRecordInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutRecordInput | TaskUpsertWithWhereUniqueWithoutRecordInput[]
    createMany?: TaskCreateManyRecordInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutRecordInput | TaskUpdateWithWhereUniqueWithoutRecordInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutRecordInput | TaskUpdateManyWithWhereWithoutRecordInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type LabelUpdateManyWithoutRecordNestedInput = {
    create?: XOR<LabelCreateWithoutRecordInput, LabelUncheckedCreateWithoutRecordInput> | LabelCreateWithoutRecordInput[] | LabelUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutRecordInput | LabelCreateOrConnectWithoutRecordInput[]
    upsert?: LabelUpsertWithWhereUniqueWithoutRecordInput | LabelUpsertWithWhereUniqueWithoutRecordInput[]
    createMany?: LabelCreateManyRecordInputEnvelope
    set?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    disconnect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    delete?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    update?: LabelUpdateWithWhereUniqueWithoutRecordInput | LabelUpdateWithWhereUniqueWithoutRecordInput[]
    updateMany?: LabelUpdateManyWithWhereWithoutRecordInput | LabelUpdateManyWithWhereWithoutRecordInput[]
    deleteMany?: LabelScalarWhereInput | LabelScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutRecordNestedInput = {
    create?: XOR<TaskCreateWithoutRecordInput, TaskUncheckedCreateWithoutRecordInput> | TaskCreateWithoutRecordInput[] | TaskUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutRecordInput | TaskCreateOrConnectWithoutRecordInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutRecordInput | TaskUpsertWithWhereUniqueWithoutRecordInput[]
    createMany?: TaskCreateManyRecordInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutRecordInput | TaskUpdateWithWhereUniqueWithoutRecordInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutRecordInput | TaskUpdateManyWithWhereWithoutRecordInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type LabelUncheckedUpdateManyWithoutRecordNestedInput = {
    create?: XOR<LabelCreateWithoutRecordInput, LabelUncheckedCreateWithoutRecordInput> | LabelCreateWithoutRecordInput[] | LabelUncheckedCreateWithoutRecordInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutRecordInput | LabelCreateOrConnectWithoutRecordInput[]
    upsert?: LabelUpsertWithWhereUniqueWithoutRecordInput | LabelUpsertWithWhereUniqueWithoutRecordInput[]
    createMany?: LabelCreateManyRecordInputEnvelope
    set?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    disconnect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    delete?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    update?: LabelUpdateWithWhereUniqueWithoutRecordInput | LabelUpdateWithWhereUniqueWithoutRecordInput[]
    updateMany?: LabelUpdateManyWithWhereWithoutRecordInput | LabelUpdateManyWithWhereWithoutRecordInput[]
    deleteMany?: LabelScalarWhereInput | LabelScalarWhereInput[]
  }

  export type DatasetCreateNestedOneWithoutTasksInput = {
    create?: XOR<DatasetCreateWithoutTasksInput, DatasetUncheckedCreateWithoutTasksInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutTasksInput
    connect?: DatasetWhereUniqueInput
  }

  export type DataRecordCreateNestedOneWithoutTasksInput = {
    create?: XOR<DataRecordCreateWithoutTasksInput, DataRecordUncheckedCreateWithoutTasksInput>
    connectOrCreate?: DataRecordCreateOrConnectWithoutTasksInput
    connect?: DataRecordWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type LabelCreateNestedManyWithoutTaskInput = {
    create?: XOR<LabelCreateWithoutTaskInput, LabelUncheckedCreateWithoutTaskInput> | LabelCreateWithoutTaskInput[] | LabelUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutTaskInput | LabelCreateOrConnectWithoutTaskInput[]
    createMany?: LabelCreateManyTaskInputEnvelope
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
  }

  export type LabelUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<LabelCreateWithoutTaskInput, LabelUncheckedCreateWithoutTaskInput> | LabelCreateWithoutTaskInput[] | LabelUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutTaskInput | LabelCreateOrConnectWithoutTaskInput[]
    createMany?: LabelCreateManyTaskInputEnvelope
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DatasetUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<DatasetCreateWithoutTasksInput, DatasetUncheckedCreateWithoutTasksInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutTasksInput
    upsert?: DatasetUpsertWithoutTasksInput
    connect?: DatasetWhereUniqueInput
    update?: XOR<XOR<DatasetUpdateToOneWithWhereWithoutTasksInput, DatasetUpdateWithoutTasksInput>, DatasetUncheckedUpdateWithoutTasksInput>
  }

  export type DataRecordUpdateOneWithoutTasksNestedInput = {
    create?: XOR<DataRecordCreateWithoutTasksInput, DataRecordUncheckedCreateWithoutTasksInput>
    connectOrCreate?: DataRecordCreateOrConnectWithoutTasksInput
    upsert?: DataRecordUpsertWithoutTasksInput
    disconnect?: DataRecordWhereInput | boolean
    delete?: DataRecordWhereInput | boolean
    connect?: DataRecordWhereUniqueInput
    update?: XOR<XOR<DataRecordUpdateToOneWithWhereWithoutTasksInput, DataRecordUpdateWithoutTasksInput>, DataRecordUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateOneWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type LabelUpdateManyWithoutTaskNestedInput = {
    create?: XOR<LabelCreateWithoutTaskInput, LabelUncheckedCreateWithoutTaskInput> | LabelCreateWithoutTaskInput[] | LabelUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutTaskInput | LabelCreateOrConnectWithoutTaskInput[]
    upsert?: LabelUpsertWithWhereUniqueWithoutTaskInput | LabelUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: LabelCreateManyTaskInputEnvelope
    set?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    disconnect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    delete?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    update?: LabelUpdateWithWhereUniqueWithoutTaskInput | LabelUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: LabelUpdateManyWithWhereWithoutTaskInput | LabelUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: LabelScalarWhereInput | LabelScalarWhereInput[]
  }

  export type LabelUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<LabelCreateWithoutTaskInput, LabelUncheckedCreateWithoutTaskInput> | LabelCreateWithoutTaskInput[] | LabelUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: LabelCreateOrConnectWithoutTaskInput | LabelCreateOrConnectWithoutTaskInput[]
    upsert?: LabelUpsertWithWhereUniqueWithoutTaskInput | LabelUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: LabelCreateManyTaskInputEnvelope
    set?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    disconnect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    delete?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    connect?: LabelWhereUniqueInput | LabelWhereUniqueInput[]
    update?: LabelUpdateWithWhereUniqueWithoutTaskInput | LabelUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: LabelUpdateManyWithWhereWithoutTaskInput | LabelUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: LabelScalarWhereInput | LabelScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutLabelsInput = {
    create?: XOR<TaskCreateWithoutLabelsInput, TaskUncheckedCreateWithoutLabelsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutLabelsInput
    connect?: TaskWhereUniqueInput
  }

  export type DataRecordCreateNestedOneWithoutLabelsInput = {
    create?: XOR<DataRecordCreateWithoutLabelsInput, DataRecordUncheckedCreateWithoutLabelsInput>
    connectOrCreate?: DataRecordCreateOrConnectWithoutLabelsInput
    connect?: DataRecordWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLabelsInput = {
    create?: XOR<UserCreateWithoutLabelsInput, UserUncheckedCreateWithoutLabelsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLabelsInput
    connect?: UserWhereUniqueInput
  }

  export type PayoutCreateNestedOneWithoutLabelInput = {
    create?: XOR<PayoutCreateWithoutLabelInput, PayoutUncheckedCreateWithoutLabelInput>
    connectOrCreate?: PayoutCreateOrConnectWithoutLabelInput
    connect?: PayoutWhereUniqueInput
  }

  export type PayoutUncheckedCreateNestedOneWithoutLabelInput = {
    create?: XOR<PayoutCreateWithoutLabelInput, PayoutUncheckedCreateWithoutLabelInput>
    connectOrCreate?: PayoutCreateOrConnectWithoutLabelInput
    connect?: PayoutWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutLabelsNestedInput = {
    create?: XOR<TaskCreateWithoutLabelsInput, TaskUncheckedCreateWithoutLabelsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutLabelsInput
    upsert?: TaskUpsertWithoutLabelsInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutLabelsInput, TaskUpdateWithoutLabelsInput>, TaskUncheckedUpdateWithoutLabelsInput>
  }

  export type DataRecordUpdateOneWithoutLabelsNestedInput = {
    create?: XOR<DataRecordCreateWithoutLabelsInput, DataRecordUncheckedCreateWithoutLabelsInput>
    connectOrCreate?: DataRecordCreateOrConnectWithoutLabelsInput
    upsert?: DataRecordUpsertWithoutLabelsInput
    disconnect?: DataRecordWhereInput | boolean
    delete?: DataRecordWhereInput | boolean
    connect?: DataRecordWhereUniqueInput
    update?: XOR<XOR<DataRecordUpdateToOneWithWhereWithoutLabelsInput, DataRecordUpdateWithoutLabelsInput>, DataRecordUncheckedUpdateWithoutLabelsInput>
  }

  export type UserUpdateOneRequiredWithoutLabelsNestedInput = {
    create?: XOR<UserCreateWithoutLabelsInput, UserUncheckedCreateWithoutLabelsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLabelsInput
    upsert?: UserUpsertWithoutLabelsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLabelsInput, UserUpdateWithoutLabelsInput>, UserUncheckedUpdateWithoutLabelsInput>
  }

  export type PayoutUpdateOneWithoutLabelNestedInput = {
    create?: XOR<PayoutCreateWithoutLabelInput, PayoutUncheckedCreateWithoutLabelInput>
    connectOrCreate?: PayoutCreateOrConnectWithoutLabelInput
    upsert?: PayoutUpsertWithoutLabelInput
    disconnect?: PayoutWhereInput | boolean
    delete?: PayoutWhereInput | boolean
    connect?: PayoutWhereUniqueInput
    update?: XOR<XOR<PayoutUpdateToOneWithWhereWithoutLabelInput, PayoutUpdateWithoutLabelInput>, PayoutUncheckedUpdateWithoutLabelInput>
  }

  export type PayoutUncheckedUpdateOneWithoutLabelNestedInput = {
    create?: XOR<PayoutCreateWithoutLabelInput, PayoutUncheckedCreateWithoutLabelInput>
    connectOrCreate?: PayoutCreateOrConnectWithoutLabelInput
    upsert?: PayoutUpsertWithoutLabelInput
    disconnect?: PayoutWhereInput | boolean
    delete?: PayoutWhereInput | boolean
    connect?: PayoutWhereUniqueInput
    update?: XOR<XOR<PayoutUpdateToOneWithWhereWithoutLabelInput, PayoutUpdateWithoutLabelInput>, PayoutUncheckedUpdateWithoutLabelInput>
  }

  export type UserCreateNestedOneWithoutPayoutsInput = {
    create?: XOR<UserCreateWithoutPayoutsInput, UserUncheckedCreateWithoutPayoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPayoutsInput
    connect?: UserWhereUniqueInput
  }

  export type DatasetCreateNestedOneWithoutPayoutsInput = {
    create?: XOR<DatasetCreateWithoutPayoutsInput, DatasetUncheckedCreateWithoutPayoutsInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutPayoutsInput
    connect?: DatasetWhereUniqueInput
  }

  export type LabelCreateNestedOneWithoutPayoutInput = {
    create?: XOR<LabelCreateWithoutPayoutInput, LabelUncheckedCreateWithoutPayoutInput>
    connectOrCreate?: LabelCreateOrConnectWithoutPayoutInput
    connect?: LabelWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPayoutsNestedInput = {
    create?: XOR<UserCreateWithoutPayoutsInput, UserUncheckedCreateWithoutPayoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPayoutsInput
    upsert?: UserUpsertWithoutPayoutsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPayoutsInput, UserUpdateWithoutPayoutsInput>, UserUncheckedUpdateWithoutPayoutsInput>
  }

  export type DatasetUpdateOneRequiredWithoutPayoutsNestedInput = {
    create?: XOR<DatasetCreateWithoutPayoutsInput, DatasetUncheckedCreateWithoutPayoutsInput>
    connectOrCreate?: DatasetCreateOrConnectWithoutPayoutsInput
    upsert?: DatasetUpsertWithoutPayoutsInput
    connect?: DatasetWhereUniqueInput
    update?: XOR<XOR<DatasetUpdateToOneWithWhereWithoutPayoutsInput, DatasetUpdateWithoutPayoutsInput>, DatasetUncheckedUpdateWithoutPayoutsInput>
  }

  export type LabelUpdateOneWithoutPayoutNestedInput = {
    create?: XOR<LabelCreateWithoutPayoutInput, LabelUncheckedCreateWithoutPayoutInput>
    connectOrCreate?: LabelCreateOrConnectWithoutPayoutInput
    upsert?: LabelUpsertWithoutPayoutInput
    disconnect?: LabelWhereInput | boolean
    delete?: LabelWhereInput | boolean
    connect?: LabelWhereUniqueInput
    update?: XOR<XOR<LabelUpdateToOneWithWhereWithoutPayoutInput, LabelUpdateWithoutPayoutInput>, LabelUncheckedUpdateWithoutPayoutInput>
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TaskCreateWithoutAssignedToInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dataset: DatasetCreateNestedOneWithoutTasksInput
    record?: DataRecordCreateNestedOneWithoutTasksInput
    labels?: LabelCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutAssignedToInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
    recordId?: string | null
    labels?: LabelUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutAssignedToInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutAssignedToInput, TaskUncheckedCreateWithoutAssignedToInput>
  }

  export type TaskCreateManyAssignedToInputEnvelope = {
    data: TaskCreateManyAssignedToInput | TaskCreateManyAssignedToInput[]
    skipDuplicates?: boolean
  }

  export type DatasetCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutDatasetInput
    records?: DataRecordCreateNestedManyWithoutDatasetInput
    payouts?: PayoutCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutDatasetInput
    records?: DataRecordUncheckedCreateNestedManyWithoutDatasetInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type DatasetCreateOrConnectWithoutCreatedByInput = {
    where: DatasetWhereUniqueInput
    create: XOR<DatasetCreateWithoutCreatedByInput, DatasetUncheckedCreateWithoutCreatedByInput>
  }

  export type DatasetCreateManyCreatedByInputEnvelope = {
    data: DatasetCreateManyCreatedByInput | DatasetCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type LabelCreateWithoutContributorInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutLabelsInput
    record?: DataRecordCreateNestedOneWithoutLabelsInput
    payout?: PayoutCreateNestedOneWithoutLabelInput
  }

  export type LabelUncheckedCreateWithoutContributorInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    taskId: string
    recordId?: string | null
    payout?: PayoutUncheckedCreateNestedOneWithoutLabelInput
  }

  export type LabelCreateOrConnectWithoutContributorInput = {
    where: LabelWhereUniqueInput
    create: XOR<LabelCreateWithoutContributorInput, LabelUncheckedCreateWithoutContributorInput>
  }

  export type LabelCreateManyContributorInputEnvelope = {
    data: LabelCreateManyContributorInput | LabelCreateManyContributorInput[]
    skipDuplicates?: boolean
  }

  export type PayoutCreateWithoutContributorInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    dataset: DatasetCreateNestedOneWithoutPayoutsInput
    label?: LabelCreateNestedOneWithoutPayoutInput
  }

  export type PayoutUncheckedCreateWithoutContributorInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    datasetId: string
    labelId?: string | null
  }

  export type PayoutCreateOrConnectWithoutContributorInput = {
    where: PayoutWhereUniqueInput
    create: XOR<PayoutCreateWithoutContributorInput, PayoutUncheckedCreateWithoutContributorInput>
  }

  export type PayoutCreateManyContributorInputEnvelope = {
    data: PayoutCreateManyContributorInput | PayoutCreateManyContributorInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutUserInput = {
    id?: string
    amount: number
    status?: string
    transactionHash?: string | null
    toAddress: string
    fromAddress?: string | null
    description?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    status?: string
    transactionHash?: string | null
    toAddress: string
    fromAddress?: string | null
    description?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutAssignedToInput, TaskUncheckedUpdateWithoutAssignedToInput>
    create: XOR<TaskCreateWithoutAssignedToInput, TaskUncheckedCreateWithoutAssignedToInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutAssignedToInput, TaskUncheckedUpdateWithoutAssignedToInput>
  }

  export type TaskUpdateManyWithWhereWithoutAssignedToInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutAssignedToInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: UuidFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringFilter<"Task"> | string
    status?: StringFilter<"Task"> | string
    reward?: FloatFilter<"Task"> | number
    requiredLabels?: IntFilter<"Task"> | number
    submittedLabels?: IntFilter<"Task"> | number
    consensusThreshold?: FloatFilter<"Task"> | number
    metadata?: JsonNullableFilter<"Task">
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    datasetId?: UuidFilter<"Task"> | string
    recordId?: UuidNullableFilter<"Task"> | string | null
    assignedToId?: UuidNullableFilter<"Task"> | string | null
  }

  export type DatasetUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: DatasetWhereUniqueInput
    update: XOR<DatasetUpdateWithoutCreatedByInput, DatasetUncheckedUpdateWithoutCreatedByInput>
    create: XOR<DatasetCreateWithoutCreatedByInput, DatasetUncheckedCreateWithoutCreatedByInput>
  }

  export type DatasetUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: DatasetWhereUniqueInput
    data: XOR<DatasetUpdateWithoutCreatedByInput, DatasetUncheckedUpdateWithoutCreatedByInput>
  }

  export type DatasetUpdateManyWithWhereWithoutCreatedByInput = {
    where: DatasetScalarWhereInput
    data: XOR<DatasetUpdateManyMutationInput, DatasetUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type DatasetScalarWhereInput = {
    AND?: DatasetScalarWhereInput | DatasetScalarWhereInput[]
    OR?: DatasetScalarWhereInput[]
    NOT?: DatasetScalarWhereInput | DatasetScalarWhereInput[]
    id?: UuidFilter<"Dataset"> | string
    name?: StringFilter<"Dataset"> | string
    description?: StringNullableFilter<"Dataset"> | string | null
    format?: StringFilter<"Dataset"> | string
    filePath?: StringFilter<"Dataset"> | string
    totalRecords?: IntFilter<"Dataset"> | number
    labeledRecords?: IntFilter<"Dataset"> | number
    labelType?: StringFilter<"Dataset"> | string
    labelOptions?: JsonNullableFilter<"Dataset">
    labelSchema?: JsonNullableFilter<"Dataset">
    totalRewardSOL?: FloatFilter<"Dataset"> | number
    rewardPerRecord?: FloatFilter<"Dataset"> | number
    maxLabelsPerRecord?: IntFilter<"Dataset"> | number
    consensusThreshold?: FloatFilter<"Dataset"> | number
    schema?: JsonNullableFilter<"Dataset">
    validationRules?: JsonNullableFilter<"Dataset">
    isActive?: BoolFilter<"Dataset"> | boolean
    createdAt?: DateTimeFilter<"Dataset"> | Date | string
    updatedAt?: DateTimeFilter<"Dataset"> | Date | string
    createdById?: UuidFilter<"Dataset"> | string
  }

  export type LabelUpsertWithWhereUniqueWithoutContributorInput = {
    where: LabelWhereUniqueInput
    update: XOR<LabelUpdateWithoutContributorInput, LabelUncheckedUpdateWithoutContributorInput>
    create: XOR<LabelCreateWithoutContributorInput, LabelUncheckedCreateWithoutContributorInput>
  }

  export type LabelUpdateWithWhereUniqueWithoutContributorInput = {
    where: LabelWhereUniqueInput
    data: XOR<LabelUpdateWithoutContributorInput, LabelUncheckedUpdateWithoutContributorInput>
  }

  export type LabelUpdateManyWithWhereWithoutContributorInput = {
    where: LabelScalarWhereInput
    data: XOR<LabelUpdateManyMutationInput, LabelUncheckedUpdateManyWithoutContributorInput>
  }

  export type LabelScalarWhereInput = {
    AND?: LabelScalarWhereInput | LabelScalarWhereInput[]
    OR?: LabelScalarWhereInput[]
    NOT?: LabelScalarWhereInput | LabelScalarWhereInput[]
    id?: UuidFilter<"Label"> | string
    value?: StringFilter<"Label"> | string
    confidence?: FloatFilter<"Label"> | number
    isAccepted?: BoolFilter<"Label"> | boolean
    isRejected?: BoolFilter<"Label"> | boolean
    rejectionReason?: StringNullableFilter<"Label"> | string | null
    timeSpentSeconds?: IntFilter<"Label"> | number
    metadata?: JsonNullableFilter<"Label">
    createdAt?: DateTimeFilter<"Label"> | Date | string
    taskId?: UuidFilter<"Label"> | string
    recordId?: UuidNullableFilter<"Label"> | string | null
    contributorId?: UuidFilter<"Label"> | string
  }

  export type PayoutUpsertWithWhereUniqueWithoutContributorInput = {
    where: PayoutWhereUniqueInput
    update: XOR<PayoutUpdateWithoutContributorInput, PayoutUncheckedUpdateWithoutContributorInput>
    create: XOR<PayoutCreateWithoutContributorInput, PayoutUncheckedCreateWithoutContributorInput>
  }

  export type PayoutUpdateWithWhereUniqueWithoutContributorInput = {
    where: PayoutWhereUniqueInput
    data: XOR<PayoutUpdateWithoutContributorInput, PayoutUncheckedUpdateWithoutContributorInput>
  }

  export type PayoutUpdateManyWithWhereWithoutContributorInput = {
    where: PayoutScalarWhereInput
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyWithoutContributorInput>
  }

  export type PayoutScalarWhereInput = {
    AND?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
    OR?: PayoutScalarWhereInput[]
    NOT?: PayoutScalarWhereInput | PayoutScalarWhereInput[]
    id?: UuidFilter<"Payout"> | string
    amountSOL?: FloatFilter<"Payout"> | number
    status?: StringFilter<"Payout"> | string
    txHash?: StringNullableFilter<"Payout"> | string | null
    createdAt?: DateTimeFilter<"Payout"> | Date | string
    updatedAt?: DateTimeFilter<"Payout"> | Date | string
    processedAt?: DateTimeNullableFilter<"Payout"> | Date | string | null
    contributorId?: UuidFilter<"Payout"> | string
    datasetId?: UuidFilter<"Payout"> | string
    labelId?: UuidNullableFilter<"Payout"> | string | null
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: UuidFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    status?: StringFilter<"Transaction"> | string
    transactionHash?: StringNullableFilter<"Transaction"> | string | null
    toAddress?: StringFilter<"Transaction"> | string
    fromAddress?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    errorMessage?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    completedAt?: DateTimeNullableFilter<"Transaction"> | Date | string | null
    userId?: UuidFilter<"Transaction"> | string
  }

  export type UserCreateWithoutDatasetsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutAssignedToInput
    labels?: LabelCreateNestedManyWithoutContributorInput
    payouts?: PayoutCreateNestedManyWithoutContributorInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDatasetsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutAssignedToInput
    labels?: LabelUncheckedCreateNestedManyWithoutContributorInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutContributorInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDatasetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDatasetsInput, UserUncheckedCreateWithoutDatasetsInput>
  }

  export type TaskCreateWithoutDatasetInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    record?: DataRecordCreateNestedOneWithoutTasksInput
    assignedTo?: UserCreateNestedOneWithoutTasksInput
    labels?: LabelCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutDatasetInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recordId?: string | null
    assignedToId?: string | null
    labels?: LabelUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutDatasetInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutDatasetInput, TaskUncheckedCreateWithoutDatasetInput>
  }

  export type TaskCreateManyDatasetInputEnvelope = {
    data: TaskCreateManyDatasetInput | TaskCreateManyDatasetInput[]
    skipDuplicates?: boolean
  }

  export type DataRecordCreateWithoutDatasetInput = {
    id?: string
    recordNumber: number
    rawData: JsonNullValueInput | InputJsonValue
    isLabeled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutRecordInput
    labels?: LabelCreateNestedManyWithoutRecordInput
  }

  export type DataRecordUncheckedCreateWithoutDatasetInput = {
    id?: string
    recordNumber: number
    rawData: JsonNullValueInput | InputJsonValue
    isLabeled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutRecordInput
    labels?: LabelUncheckedCreateNestedManyWithoutRecordInput
  }

  export type DataRecordCreateOrConnectWithoutDatasetInput = {
    where: DataRecordWhereUniqueInput
    create: XOR<DataRecordCreateWithoutDatasetInput, DataRecordUncheckedCreateWithoutDatasetInput>
  }

  export type DataRecordCreateManyDatasetInputEnvelope = {
    data: DataRecordCreateManyDatasetInput | DataRecordCreateManyDatasetInput[]
    skipDuplicates?: boolean
  }

  export type PayoutCreateWithoutDatasetInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    contributor: UserCreateNestedOneWithoutPayoutsInput
    label?: LabelCreateNestedOneWithoutPayoutInput
  }

  export type PayoutUncheckedCreateWithoutDatasetInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    contributorId: string
    labelId?: string | null
  }

  export type PayoutCreateOrConnectWithoutDatasetInput = {
    where: PayoutWhereUniqueInput
    create: XOR<PayoutCreateWithoutDatasetInput, PayoutUncheckedCreateWithoutDatasetInput>
  }

  export type PayoutCreateManyDatasetInputEnvelope = {
    data: PayoutCreateManyDatasetInput | PayoutCreateManyDatasetInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDatasetsInput = {
    update: XOR<UserUpdateWithoutDatasetsInput, UserUncheckedUpdateWithoutDatasetsInput>
    create: XOR<UserCreateWithoutDatasetsInput, UserUncheckedCreateWithoutDatasetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDatasetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDatasetsInput, UserUncheckedUpdateWithoutDatasetsInput>
  }

  export type UserUpdateWithoutDatasetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutAssignedToNestedInput
    labels?: LabelUpdateManyWithoutContributorNestedInput
    payouts?: PayoutUpdateManyWithoutContributorNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDatasetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutAssignedToNestedInput
    labels?: LabelUncheckedUpdateManyWithoutContributorNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutContributorNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutDatasetInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutDatasetInput, TaskUncheckedUpdateWithoutDatasetInput>
    create: XOR<TaskCreateWithoutDatasetInput, TaskUncheckedCreateWithoutDatasetInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutDatasetInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutDatasetInput, TaskUncheckedUpdateWithoutDatasetInput>
  }

  export type TaskUpdateManyWithWhereWithoutDatasetInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutDatasetInput>
  }

  export type DataRecordUpsertWithWhereUniqueWithoutDatasetInput = {
    where: DataRecordWhereUniqueInput
    update: XOR<DataRecordUpdateWithoutDatasetInput, DataRecordUncheckedUpdateWithoutDatasetInput>
    create: XOR<DataRecordCreateWithoutDatasetInput, DataRecordUncheckedCreateWithoutDatasetInput>
  }

  export type DataRecordUpdateWithWhereUniqueWithoutDatasetInput = {
    where: DataRecordWhereUniqueInput
    data: XOR<DataRecordUpdateWithoutDatasetInput, DataRecordUncheckedUpdateWithoutDatasetInput>
  }

  export type DataRecordUpdateManyWithWhereWithoutDatasetInput = {
    where: DataRecordScalarWhereInput
    data: XOR<DataRecordUpdateManyMutationInput, DataRecordUncheckedUpdateManyWithoutDatasetInput>
  }

  export type DataRecordScalarWhereInput = {
    AND?: DataRecordScalarWhereInput | DataRecordScalarWhereInput[]
    OR?: DataRecordScalarWhereInput[]
    NOT?: DataRecordScalarWhereInput | DataRecordScalarWhereInput[]
    id?: UuidFilter<"DataRecord"> | string
    recordNumber?: IntFilter<"DataRecord"> | number
    rawData?: JsonFilter<"DataRecord">
    isLabeled?: BoolFilter<"DataRecord"> | boolean
    createdAt?: DateTimeFilter<"DataRecord"> | Date | string
    updatedAt?: DateTimeFilter<"DataRecord"> | Date | string
    datasetId?: UuidFilter<"DataRecord"> | string
  }

  export type PayoutUpsertWithWhereUniqueWithoutDatasetInput = {
    where: PayoutWhereUniqueInput
    update: XOR<PayoutUpdateWithoutDatasetInput, PayoutUncheckedUpdateWithoutDatasetInput>
    create: XOR<PayoutCreateWithoutDatasetInput, PayoutUncheckedCreateWithoutDatasetInput>
  }

  export type PayoutUpdateWithWhereUniqueWithoutDatasetInput = {
    where: PayoutWhereUniqueInput
    data: XOR<PayoutUpdateWithoutDatasetInput, PayoutUncheckedUpdateWithoutDatasetInput>
  }

  export type PayoutUpdateManyWithWhereWithoutDatasetInput = {
    where: PayoutScalarWhereInput
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyWithoutDatasetInput>
  }

  export type DatasetCreateWithoutRecordsInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutDatasetsInput
    tasks?: TaskCreateNestedManyWithoutDatasetInput
    payouts?: PayoutCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUncheckedCreateWithoutRecordsInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    tasks?: TaskUncheckedCreateNestedManyWithoutDatasetInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type DatasetCreateOrConnectWithoutRecordsInput = {
    where: DatasetWhereUniqueInput
    create: XOR<DatasetCreateWithoutRecordsInput, DatasetUncheckedCreateWithoutRecordsInput>
  }

  export type TaskCreateWithoutRecordInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dataset: DatasetCreateNestedOneWithoutTasksInput
    assignedTo?: UserCreateNestedOneWithoutTasksInput
    labels?: LabelCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutRecordInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
    assignedToId?: string | null
    labels?: LabelUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutRecordInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutRecordInput, TaskUncheckedCreateWithoutRecordInput>
  }

  export type TaskCreateManyRecordInputEnvelope = {
    data: TaskCreateManyRecordInput | TaskCreateManyRecordInput[]
    skipDuplicates?: boolean
  }

  export type LabelCreateWithoutRecordInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutLabelsInput
    contributor: UserCreateNestedOneWithoutLabelsInput
    payout?: PayoutCreateNestedOneWithoutLabelInput
  }

  export type LabelUncheckedCreateWithoutRecordInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    taskId: string
    contributorId: string
    payout?: PayoutUncheckedCreateNestedOneWithoutLabelInput
  }

  export type LabelCreateOrConnectWithoutRecordInput = {
    where: LabelWhereUniqueInput
    create: XOR<LabelCreateWithoutRecordInput, LabelUncheckedCreateWithoutRecordInput>
  }

  export type LabelCreateManyRecordInputEnvelope = {
    data: LabelCreateManyRecordInput | LabelCreateManyRecordInput[]
    skipDuplicates?: boolean
  }

  export type DatasetUpsertWithoutRecordsInput = {
    update: XOR<DatasetUpdateWithoutRecordsInput, DatasetUncheckedUpdateWithoutRecordsInput>
    create: XOR<DatasetCreateWithoutRecordsInput, DatasetUncheckedCreateWithoutRecordsInput>
    where?: DatasetWhereInput
  }

  export type DatasetUpdateToOneWithWhereWithoutRecordsInput = {
    where?: DatasetWhereInput
    data: XOR<DatasetUpdateWithoutRecordsInput, DatasetUncheckedUpdateWithoutRecordsInput>
  }

  export type DatasetUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutDatasetsNestedInput
    tasks?: TaskUpdateManyWithoutDatasetNestedInput
    payouts?: PayoutUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutDatasetNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutRecordInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutRecordInput, TaskUncheckedUpdateWithoutRecordInput>
    create: XOR<TaskCreateWithoutRecordInput, TaskUncheckedCreateWithoutRecordInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutRecordInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutRecordInput, TaskUncheckedUpdateWithoutRecordInput>
  }

  export type TaskUpdateManyWithWhereWithoutRecordInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutRecordInput>
  }

  export type LabelUpsertWithWhereUniqueWithoutRecordInput = {
    where: LabelWhereUniqueInput
    update: XOR<LabelUpdateWithoutRecordInput, LabelUncheckedUpdateWithoutRecordInput>
    create: XOR<LabelCreateWithoutRecordInput, LabelUncheckedCreateWithoutRecordInput>
  }

  export type LabelUpdateWithWhereUniqueWithoutRecordInput = {
    where: LabelWhereUniqueInput
    data: XOR<LabelUpdateWithoutRecordInput, LabelUncheckedUpdateWithoutRecordInput>
  }

  export type LabelUpdateManyWithWhereWithoutRecordInput = {
    where: LabelScalarWhereInput
    data: XOR<LabelUpdateManyMutationInput, LabelUncheckedUpdateManyWithoutRecordInput>
  }

  export type DatasetCreateWithoutTasksInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutDatasetsInput
    records?: DataRecordCreateNestedManyWithoutDatasetInput
    payouts?: PayoutCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    records?: DataRecordUncheckedCreateNestedManyWithoutDatasetInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type DatasetCreateOrConnectWithoutTasksInput = {
    where: DatasetWhereUniqueInput
    create: XOR<DatasetCreateWithoutTasksInput, DatasetUncheckedCreateWithoutTasksInput>
  }

  export type DataRecordCreateWithoutTasksInput = {
    id?: string
    recordNumber: number
    rawData: JsonNullValueInput | InputJsonValue
    isLabeled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataset: DatasetCreateNestedOneWithoutRecordsInput
    labels?: LabelCreateNestedManyWithoutRecordInput
  }

  export type DataRecordUncheckedCreateWithoutTasksInput = {
    id?: string
    recordNumber: number
    rawData: JsonNullValueInput | InputJsonValue
    isLabeled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
    labels?: LabelUncheckedCreateNestedManyWithoutRecordInput
  }

  export type DataRecordCreateOrConnectWithoutTasksInput = {
    where: DataRecordWhereUniqueInput
    create: XOR<DataRecordCreateWithoutTasksInput, DataRecordUncheckedCreateWithoutTasksInput>
  }

  export type UserCreateWithoutTasksInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    datasets?: DatasetCreateNestedManyWithoutCreatedByInput
    labels?: LabelCreateNestedManyWithoutContributorInput
    payouts?: PayoutCreateNestedManyWithoutContributorInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    datasets?: DatasetUncheckedCreateNestedManyWithoutCreatedByInput
    labels?: LabelUncheckedCreateNestedManyWithoutContributorInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutContributorInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type LabelCreateWithoutTaskInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    record?: DataRecordCreateNestedOneWithoutLabelsInput
    contributor: UserCreateNestedOneWithoutLabelsInput
    payout?: PayoutCreateNestedOneWithoutLabelInput
  }

  export type LabelUncheckedCreateWithoutTaskInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    recordId?: string | null
    contributorId: string
    payout?: PayoutUncheckedCreateNestedOneWithoutLabelInput
  }

  export type LabelCreateOrConnectWithoutTaskInput = {
    where: LabelWhereUniqueInput
    create: XOR<LabelCreateWithoutTaskInput, LabelUncheckedCreateWithoutTaskInput>
  }

  export type LabelCreateManyTaskInputEnvelope = {
    data: LabelCreateManyTaskInput | LabelCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type DatasetUpsertWithoutTasksInput = {
    update: XOR<DatasetUpdateWithoutTasksInput, DatasetUncheckedUpdateWithoutTasksInput>
    create: XOR<DatasetCreateWithoutTasksInput, DatasetUncheckedCreateWithoutTasksInput>
    where?: DatasetWhereInput
  }

  export type DatasetUpdateToOneWithWhereWithoutTasksInput = {
    where?: DatasetWhereInput
    data: XOR<DatasetUpdateWithoutTasksInput, DatasetUncheckedUpdateWithoutTasksInput>
  }

  export type DatasetUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutDatasetsNestedInput
    records?: DataRecordUpdateManyWithoutDatasetNestedInput
    payouts?: PayoutUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    records?: DataRecordUncheckedUpdateManyWithoutDatasetNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type DataRecordUpsertWithoutTasksInput = {
    update: XOR<DataRecordUpdateWithoutTasksInput, DataRecordUncheckedUpdateWithoutTasksInput>
    create: XOR<DataRecordCreateWithoutTasksInput, DataRecordUncheckedCreateWithoutTasksInput>
    where?: DataRecordWhereInput
  }

  export type DataRecordUpdateToOneWithWhereWithoutTasksInput = {
    where?: DataRecordWhereInput
    data: XOR<DataRecordUpdateWithoutTasksInput, DataRecordUncheckedUpdateWithoutTasksInput>
  }

  export type DataRecordUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: DatasetUpdateOneRequiredWithoutRecordsNestedInput
    labels?: LabelUpdateManyWithoutRecordNestedInput
  }

  export type DataRecordUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
    labels?: LabelUncheckedUpdateManyWithoutRecordNestedInput
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasets?: DatasetUpdateManyWithoutCreatedByNestedInput
    labels?: LabelUpdateManyWithoutContributorNestedInput
    payouts?: PayoutUpdateManyWithoutContributorNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasets?: DatasetUncheckedUpdateManyWithoutCreatedByNestedInput
    labels?: LabelUncheckedUpdateManyWithoutContributorNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutContributorNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LabelUpsertWithWhereUniqueWithoutTaskInput = {
    where: LabelWhereUniqueInput
    update: XOR<LabelUpdateWithoutTaskInput, LabelUncheckedUpdateWithoutTaskInput>
    create: XOR<LabelCreateWithoutTaskInput, LabelUncheckedCreateWithoutTaskInput>
  }

  export type LabelUpdateWithWhereUniqueWithoutTaskInput = {
    where: LabelWhereUniqueInput
    data: XOR<LabelUpdateWithoutTaskInput, LabelUncheckedUpdateWithoutTaskInput>
  }

  export type LabelUpdateManyWithWhereWithoutTaskInput = {
    where: LabelScalarWhereInput
    data: XOR<LabelUpdateManyMutationInput, LabelUncheckedUpdateManyWithoutTaskInput>
  }

  export type TaskCreateWithoutLabelsInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dataset: DatasetCreateNestedOneWithoutTasksInput
    record?: DataRecordCreateNestedOneWithoutTasksInput
    assignedTo?: UserCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutLabelsInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
    recordId?: string | null
    assignedToId?: string | null
  }

  export type TaskCreateOrConnectWithoutLabelsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutLabelsInput, TaskUncheckedCreateWithoutLabelsInput>
  }

  export type DataRecordCreateWithoutLabelsInput = {
    id?: string
    recordNumber: number
    rawData: JsonNullValueInput | InputJsonValue
    isLabeled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dataset: DatasetCreateNestedOneWithoutRecordsInput
    tasks?: TaskCreateNestedManyWithoutRecordInput
  }

  export type DataRecordUncheckedCreateWithoutLabelsInput = {
    id?: string
    recordNumber: number
    rawData: JsonNullValueInput | InputJsonValue
    isLabeled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
    tasks?: TaskUncheckedCreateNestedManyWithoutRecordInput
  }

  export type DataRecordCreateOrConnectWithoutLabelsInput = {
    where: DataRecordWhereUniqueInput
    create: XOR<DataRecordCreateWithoutLabelsInput, DataRecordUncheckedCreateWithoutLabelsInput>
  }

  export type UserCreateWithoutLabelsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutAssignedToInput
    datasets?: DatasetCreateNestedManyWithoutCreatedByInput
    payouts?: PayoutCreateNestedManyWithoutContributorInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLabelsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutAssignedToInput
    datasets?: DatasetUncheckedCreateNestedManyWithoutCreatedByInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutContributorInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLabelsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLabelsInput, UserUncheckedCreateWithoutLabelsInput>
  }

  export type PayoutCreateWithoutLabelInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    contributor: UserCreateNestedOneWithoutPayoutsInput
    dataset: DatasetCreateNestedOneWithoutPayoutsInput
  }

  export type PayoutUncheckedCreateWithoutLabelInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    contributorId: string
    datasetId: string
  }

  export type PayoutCreateOrConnectWithoutLabelInput = {
    where: PayoutWhereUniqueInput
    create: XOR<PayoutCreateWithoutLabelInput, PayoutUncheckedCreateWithoutLabelInput>
  }

  export type TaskUpsertWithoutLabelsInput = {
    update: XOR<TaskUpdateWithoutLabelsInput, TaskUncheckedUpdateWithoutLabelsInput>
    create: XOR<TaskCreateWithoutLabelsInput, TaskUncheckedCreateWithoutLabelsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutLabelsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutLabelsInput, TaskUncheckedUpdateWithoutLabelsInput>
  }

  export type TaskUpdateWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: DatasetUpdateOneRequiredWithoutTasksNestedInput
    record?: DataRecordUpdateOneWithoutTasksNestedInput
    assignedTo?: UserUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DataRecordUpsertWithoutLabelsInput = {
    update: XOR<DataRecordUpdateWithoutLabelsInput, DataRecordUncheckedUpdateWithoutLabelsInput>
    create: XOR<DataRecordCreateWithoutLabelsInput, DataRecordUncheckedCreateWithoutLabelsInput>
    where?: DataRecordWhereInput
  }

  export type DataRecordUpdateToOneWithWhereWithoutLabelsInput = {
    where?: DataRecordWhereInput
    data: XOR<DataRecordUpdateWithoutLabelsInput, DataRecordUncheckedUpdateWithoutLabelsInput>
  }

  export type DataRecordUpdateWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: DatasetUpdateOneRequiredWithoutRecordsNestedInput
    tasks?: TaskUpdateManyWithoutRecordNestedInput
  }

  export type DataRecordUncheckedUpdateWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutRecordNestedInput
  }

  export type UserUpsertWithoutLabelsInput = {
    update: XOR<UserUpdateWithoutLabelsInput, UserUncheckedUpdateWithoutLabelsInput>
    create: XOR<UserCreateWithoutLabelsInput, UserUncheckedCreateWithoutLabelsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLabelsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLabelsInput, UserUncheckedUpdateWithoutLabelsInput>
  }

  export type UserUpdateWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutAssignedToNestedInput
    datasets?: DatasetUpdateManyWithoutCreatedByNestedInput
    payouts?: PayoutUpdateManyWithoutContributorNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLabelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutAssignedToNestedInput
    datasets?: DatasetUncheckedUpdateManyWithoutCreatedByNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutContributorNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PayoutUpsertWithoutLabelInput = {
    update: XOR<PayoutUpdateWithoutLabelInput, PayoutUncheckedUpdateWithoutLabelInput>
    create: XOR<PayoutCreateWithoutLabelInput, PayoutUncheckedCreateWithoutLabelInput>
    where?: PayoutWhereInput
  }

  export type PayoutUpdateToOneWithWhereWithoutLabelInput = {
    where?: PayoutWhereInput
    data: XOR<PayoutUpdateWithoutLabelInput, PayoutUncheckedUpdateWithoutLabelInput>
  }

  export type PayoutUpdateWithoutLabelInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contributor?: UserUpdateOneRequiredWithoutPayoutsNestedInput
    dataset?: DatasetUpdateOneRequiredWithoutPayoutsNestedInput
  }

  export type PayoutUncheckedUpdateWithoutLabelInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contributorId?: StringFieldUpdateOperationsInput | string
    datasetId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutPayoutsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutAssignedToInput
    datasets?: DatasetCreateNestedManyWithoutCreatedByInput
    labels?: LabelCreateNestedManyWithoutContributorInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPayoutsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutAssignedToInput
    datasets?: DatasetUncheckedCreateNestedManyWithoutCreatedByInput
    labels?: LabelUncheckedCreateNestedManyWithoutContributorInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPayoutsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPayoutsInput, UserUncheckedCreateWithoutPayoutsInput>
  }

  export type DatasetCreateWithoutPayoutsInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutDatasetsInput
    tasks?: TaskCreateNestedManyWithoutDatasetInput
    records?: DataRecordCreateNestedManyWithoutDatasetInput
  }

  export type DatasetUncheckedCreateWithoutPayoutsInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById: string
    tasks?: TaskUncheckedCreateNestedManyWithoutDatasetInput
    records?: DataRecordUncheckedCreateNestedManyWithoutDatasetInput
  }

  export type DatasetCreateOrConnectWithoutPayoutsInput = {
    where: DatasetWhereUniqueInput
    create: XOR<DatasetCreateWithoutPayoutsInput, DatasetUncheckedCreateWithoutPayoutsInput>
  }

  export type LabelCreateWithoutPayoutInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    task: TaskCreateNestedOneWithoutLabelsInput
    record?: DataRecordCreateNestedOneWithoutLabelsInput
    contributor: UserCreateNestedOneWithoutLabelsInput
  }

  export type LabelUncheckedCreateWithoutPayoutInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    taskId: string
    recordId?: string | null
    contributorId: string
  }

  export type LabelCreateOrConnectWithoutPayoutInput = {
    where: LabelWhereUniqueInput
    create: XOR<LabelCreateWithoutPayoutInput, LabelUncheckedCreateWithoutPayoutInput>
  }

  export type UserUpsertWithoutPayoutsInput = {
    update: XOR<UserUpdateWithoutPayoutsInput, UserUncheckedUpdateWithoutPayoutsInput>
    create: XOR<UserCreateWithoutPayoutsInput, UserUncheckedCreateWithoutPayoutsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPayoutsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPayoutsInput, UserUncheckedUpdateWithoutPayoutsInput>
  }

  export type UserUpdateWithoutPayoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutAssignedToNestedInput
    datasets?: DatasetUpdateManyWithoutCreatedByNestedInput
    labels?: LabelUpdateManyWithoutContributorNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPayoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutAssignedToNestedInput
    datasets?: DatasetUncheckedUpdateManyWithoutCreatedByNestedInput
    labels?: LabelUncheckedUpdateManyWithoutContributorNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DatasetUpsertWithoutPayoutsInput = {
    update: XOR<DatasetUpdateWithoutPayoutsInput, DatasetUncheckedUpdateWithoutPayoutsInput>
    create: XOR<DatasetCreateWithoutPayoutsInput, DatasetUncheckedCreateWithoutPayoutsInput>
    where?: DatasetWhereInput
  }

  export type DatasetUpdateToOneWithWhereWithoutPayoutsInput = {
    where?: DatasetWhereInput
    data: XOR<DatasetUpdateWithoutPayoutsInput, DatasetUncheckedUpdateWithoutPayoutsInput>
  }

  export type DatasetUpdateWithoutPayoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutDatasetsNestedInput
    tasks?: TaskUpdateManyWithoutDatasetNestedInput
    records?: DataRecordUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateWithoutPayoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutDatasetNestedInput
    records?: DataRecordUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type LabelUpsertWithoutPayoutInput = {
    update: XOR<LabelUpdateWithoutPayoutInput, LabelUncheckedUpdateWithoutPayoutInput>
    create: XOR<LabelCreateWithoutPayoutInput, LabelUncheckedCreateWithoutPayoutInput>
    where?: LabelWhereInput
  }

  export type LabelUpdateToOneWithWhereWithoutPayoutInput = {
    where?: LabelWhereInput
    data: XOR<LabelUpdateWithoutPayoutInput, LabelUncheckedUpdateWithoutPayoutInput>
  }

  export type LabelUpdateWithoutPayoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutLabelsNestedInput
    record?: DataRecordUpdateOneWithoutLabelsNestedInput
    contributor?: UserUpdateOneRequiredWithoutLabelsNestedInput
  }

  export type LabelUncheckedUpdateWithoutPayoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    contributorId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutAssignedToInput
    datasets?: DatasetCreateNestedManyWithoutCreatedByInput
    labels?: LabelCreateNestedManyWithoutContributorInput
    payouts?: PayoutCreateNestedManyWithoutContributorInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    walletAddress?: string | null
    isActive?: boolean
    totalEarnings?: number
    tasksCompleted?: number
    accuracyRate?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutAssignedToInput
    datasets?: DatasetUncheckedCreateNestedManyWithoutCreatedByInput
    labels?: LabelUncheckedCreateNestedManyWithoutContributorInput
    payouts?: PayoutUncheckedCreateNestedManyWithoutContributorInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutAssignedToNestedInput
    datasets?: DatasetUpdateManyWithoutCreatedByNestedInput
    labels?: LabelUpdateManyWithoutContributorNestedInput
    payouts?: PayoutUpdateManyWithoutContributorNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    totalEarnings?: FloatFieldUpdateOperationsInput | number
    tasksCompleted?: IntFieldUpdateOperationsInput | number
    accuracyRate?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutAssignedToNestedInput
    datasets?: DatasetUncheckedUpdateManyWithoutCreatedByNestedInput
    labels?: LabelUncheckedUpdateManyWithoutContributorNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutContributorNestedInput
  }

  export type TaskCreateManyAssignedToInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
    recordId?: string | null
  }

  export type DatasetCreateManyCreatedByInput = {
    id?: string
    name: string
    description?: string | null
    format: string
    filePath: string
    totalRecords?: number
    labeledRecords?: number
    labelType?: string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: number
    rewardPerRecord?: number
    maxLabelsPerRecord?: number
    consensusThreshold?: number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabelCreateManyContributorInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    taskId: string
    recordId?: string | null
  }

  export type PayoutCreateManyContributorInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    datasetId: string
    labelId?: string | null
  }

  export type TransactionCreateManyUserInput = {
    id?: string
    amount: number
    status?: string
    transactionHash?: string | null
    toAddress: string
    fromAddress?: string | null
    description?: string | null
    errorMessage?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type TaskUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: DatasetUpdateOneRequiredWithoutTasksNestedInput
    record?: DataRecordUpdateOneWithoutTasksNestedInput
    labels?: LabelUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: LabelUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutAssignedToInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DatasetUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutDatasetNestedInput
    records?: DataRecordUpdateManyWithoutDatasetNestedInput
    payouts?: PayoutUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutDatasetNestedInput
    records?: DataRecordUncheckedUpdateManyWithoutDatasetNestedInput
    payouts?: PayoutUncheckedUpdateManyWithoutDatasetNestedInput
  }

  export type DatasetUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    format?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    labeledRecords?: IntFieldUpdateOperationsInput | number
    labelType?: StringFieldUpdateOperationsInput | string
    labelOptions?: NullableJsonNullValueInput | InputJsonValue
    labelSchema?: NullableJsonNullValueInput | InputJsonValue
    totalRewardSOL?: FloatFieldUpdateOperationsInput | number
    rewardPerRecord?: FloatFieldUpdateOperationsInput | number
    maxLabelsPerRecord?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    schema?: NullableJsonNullValueInput | InputJsonValue
    validationRules?: NullableJsonNullValueInput | InputJsonValue
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabelUpdateWithoutContributorInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutLabelsNestedInput
    record?: DataRecordUpdateOneWithoutLabelsNestedInput
    payout?: PayoutUpdateOneWithoutLabelNestedInput
  }

  export type LabelUncheckedUpdateWithoutContributorInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    payout?: PayoutUncheckedUpdateOneWithoutLabelNestedInput
  }

  export type LabelUncheckedUpdateManyWithoutContributorInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayoutUpdateWithoutContributorInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataset?: DatasetUpdateOneRequiredWithoutPayoutsNestedInput
    label?: LabelUpdateOneWithoutPayoutNestedInput
  }

  export type PayoutUncheckedUpdateWithoutContributorInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datasetId?: StringFieldUpdateOperationsInput | string
    labelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayoutUncheckedUpdateManyWithoutContributorInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    datasetId?: StringFieldUpdateOperationsInput | string
    labelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    toAddress?: StringFieldUpdateOperationsInput | string
    fromAddress?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskCreateManyDatasetInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    recordId?: string | null
    assignedToId?: string | null
  }

  export type DataRecordCreateManyDatasetInput = {
    id?: string
    recordNumber: number
    rawData: JsonNullValueInput | InputJsonValue
    isLabeled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PayoutCreateManyDatasetInput = {
    id?: string
    amountSOL: number
    status?: string
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    processedAt?: Date | string | null
    contributorId: string
    labelId?: string | null
  }

  export type TaskUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    record?: DataRecordUpdateOneWithoutTasksNestedInput
    assignedTo?: UserUpdateOneWithoutTasksNestedInput
    labels?: LabelUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: LabelUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DataRecordUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutRecordNestedInput
    labels?: LabelUpdateManyWithoutRecordNestedInput
  }

  export type DataRecordUncheckedUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutRecordNestedInput
    labels?: LabelUncheckedUpdateManyWithoutRecordNestedInput
  }

  export type DataRecordUncheckedUpdateManyWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordNumber?: IntFieldUpdateOperationsInput | number
    rawData?: JsonNullValueInput | InputJsonValue
    isLabeled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contributor?: UserUpdateOneRequiredWithoutPayoutsNestedInput
    label?: LabelUpdateOneWithoutPayoutNestedInput
  }

  export type PayoutUncheckedUpdateWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contributorId?: StringFieldUpdateOperationsInput | string
    labelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PayoutUncheckedUpdateManyWithoutDatasetInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountSOL?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contributorId?: StringFieldUpdateOperationsInput | string
    labelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskCreateManyRecordInput = {
    id?: string
    title: string
    description: string
    status?: string
    reward: number
    requiredLabels?: number
    submittedLabels?: number
    consensusThreshold?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    datasetId: string
    assignedToId?: string | null
  }

  export type LabelCreateManyRecordInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    taskId: string
    contributorId: string
  }

  export type TaskUpdateWithoutRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dataset?: DatasetUpdateOneRequiredWithoutTasksNestedInput
    assignedTo?: UserUpdateOneWithoutTasksNestedInput
    labels?: LabelUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
    labels?: LabelUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    reward?: FloatFieldUpdateOperationsInput | number
    requiredLabels?: IntFieldUpdateOperationsInput | number
    submittedLabels?: IntFieldUpdateOperationsInput | number
    consensusThreshold?: FloatFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    datasetId?: StringFieldUpdateOperationsInput | string
    assignedToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LabelUpdateWithoutRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneRequiredWithoutLabelsNestedInput
    contributor?: UserUpdateOneRequiredWithoutLabelsNestedInput
    payout?: PayoutUpdateOneWithoutLabelNestedInput
  }

  export type LabelUncheckedUpdateWithoutRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    contributorId?: StringFieldUpdateOperationsInput | string
    payout?: PayoutUncheckedUpdateOneWithoutLabelNestedInput
  }

  export type LabelUncheckedUpdateManyWithoutRecordInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskId?: StringFieldUpdateOperationsInput | string
    contributorId?: StringFieldUpdateOperationsInput | string
  }

  export type LabelCreateManyTaskInput = {
    id?: string
    value: string
    confidence?: number
    isAccepted?: boolean
    isRejected?: boolean
    rejectionReason?: string | null
    timeSpentSeconds?: number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    recordId?: string | null
    contributorId: string
  }

  export type LabelUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    record?: DataRecordUpdateOneWithoutLabelsNestedInput
    contributor?: UserUpdateOneRequiredWithoutLabelsNestedInput
    payout?: PayoutUpdateOneWithoutLabelNestedInput
  }

  export type LabelUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    contributorId?: StringFieldUpdateOperationsInput | string
    payout?: PayoutUncheckedUpdateOneWithoutLabelNestedInput
  }

  export type LabelUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    confidence?: FloatFieldUpdateOperationsInput | number
    isAccepted?: BoolFieldUpdateOperationsInput | boolean
    isRejected?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    timeSpentSeconds?: IntFieldUpdateOperationsInput | number
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    contributorId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}