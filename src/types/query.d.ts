import Expr from './Expr'

type ExprVal = Expr | string | number | boolean | { [key: string]: any }
type ExprArg = ExprVal | Array<ExprVal>
export type Lambda = (...vars: any[]) => Expr

/**
 * The `Ref` function is used to express the reference for a
 * specific document that exists in the current database,
 * within the `schema_ref`, having the document ID `id`.
 *
 * [API Reference](https://docs.fauna.com/fauna/current/api/fql/functions/ref?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg} ref
 * A Reference to a specific schema document to which the desired document belongs.
 *
 * @param {ExprArg} id
 * A document identifier, which is a string-encoded 64-bit integer.
 *
 * @example
 * q.Ref(q.Collection('spells'), '181388642046968320')
 */
export function Ref(ref: ExprArg, id?: ExprArg): Expr


export function Bytes(bytes: ExprArg | ArrayBuffer | Uint8Array): Expr

/**
 * The `Abort` function terminates the current transaction and augments
 * the returned error with the associated message. Any modifications to
 * data or schema in the aborted transaction are ignored, even if this
 * modification took place before the abort function was executed.
 *
 * [API Reference](https://docs.fauna.com/fauna/current/api/fql/functions/abort?lang=javascript)
 *
 * ---
 *
 * @param {string|ExprArg} msg
 * An abort message.
 *
 * @example
 * q.Abort('Reset Transaction')
 * // Error: [BadRequest] transaction aborted: Reset Transaction
 */
export function Abort(msg: ExprArg | string): Expr

/**
 * The `At` function executes a temporal query, a query which examines
 * the data in the past. The timestamp parameter determines the data available
 * for viewing by creating a virtual snapshot of the data which was current at
 * that date and time. All reads from the associated expression is then executed
 * on that virtual snapshot. In contrast, all write operations must be executed at
 * the current time. Attempting a write operation at any other time produces an error.
 *
 * [API Reference](https://docs.fauna.com/fauna/current/api/fql/functions/at?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg} timestamp
 * The timestamp of the virtual snapshot of the data.
 *
 * @param {ExprArg} expr
 * The FQL statement to be executed.
 *
 * @example
 * q.At(
 *   q.Time('1970-01-01T00:00:00Z'),
 *   q.Paginate(q.Collections())
 * )
 */
export function At(timestamp: ExprArg, expr: ExprArg): Expr
export function Let(vars: ExprArg, in_expr: ExprArg): Expr
export function Var(varName: ExprArg): Expr

/**
 * The `If` function evaluates and returns the `then` or `_else` expression,
 * depending on the value of the `condition` expression. If the `condition` expression
 * evaluates to anything other than a `Boolean`, If returns an `"invalid argument"` error.
 * Any valid Fauna Query Language expression is acceptable, including `null`.
 *
 * [API Reference](https://docs.fauna.com/fauna/current/api/fql/functions/if?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg} condition
 * The conditional expression to be evaluated and tested for `true` or `false`.
 *
 * @param {ExprArg|null} then
 * The expression or variable to return if `condition` is `true`.
 *
 * @param {ExprArg|null} _else
 * The expression or variable to return if `condition` is `false`.
 *
 * @example
 * q.If(true, 'was true', 'was false')
 */
export function If(
  condition: ExprArg,
  then: ExprArg | null,
  _else: ExprArg | null
): Expr

/**
 * The `Do` function evaluates a list of expressions which are provided as
 * arguments. This evaluation occurs sequentially, from left to right, ensuring
 * that modifications made by earlier expressions are seen by later expressions.
 * If one of the expressions evaluated by `Do` returns an error, the current
 * transaction is terminated and none of the expressions' effects are persisted
 * in the database.
 *
 * If all of the expressions executed by `Do` succeed, only the results of the last
 * statements executed are returned. If no expressions are provided, `Do` returns an error.
 *
 * [API Reference](https://docs.fauna.com/fauna/current/api/fql/functions/do?lang=javascript)
 *
 * ---
 *
 * @param {...ExprArg[]} args
 * One or more expressions to be evaluated.
 *
 * @example
 * q.Do(
 *   q.Create(
 *     q.Ref(q.Collection('magical_creatures'), '2'), { data: { name: 'Orwen' } }
 *   ),
 *   q.Get(q.Ref(q.Collection('magical_creatures'), '2'))
 * )
 */
export function Do(...args: ExprArg[]): Expr
export function Object(fields: ExprArg): Expr
export function Lambda(f: Lambda): Expr
export function Lambda(var_name: ExprArg, expr: ExprArg): Expr

/**
 * The `Call` function executes a user-defined function previously defined
 * with the CreateFunction function. The `Call` function takes a variable
 * length list of arguments which must match the type and number of the
 * function being called. These arguments are provided to the function being
 * executed by `Call`.
 *
 *
 * [API Reference](https://docs.fauna.com/fauna/current/api/fql/functions/call?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg} ref
 * The name, or `Reference`, of the function to call.
 *
 * @param {...ExprArg[]} args
 * The arguments for the function.
 *
 * @example
 * q.Call('increment', 2)
 */
export function Call(ref: ExprArg, ...args: ExprArg[]): Expr

/**
 * The `Query` function wraps the provided Lambda function, preventing
 * immediate execution, and making the function available for use in
 * index bindings, `CreateFunction`, and ABAC predicates.
 *
 * For example, when creating a named function with `CreateFunction`,
 * `Query` defers execution of the Lambda function until the `Call`
 * function is called.
 *
 * [API Reference](https://docs.fauna.com/fauna/current/api/fql/functions/query?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg|Lambda} lambda
 * The Lambda function to wrap.
 *
 * @example
 * q.Query(q.Lambda('X', q.Var('X')))
 */
export function Query(lambda: ExprArg | Lambda): Expr

/**
 * The `Map` function iterates on the provided array, calling the provided
 * lambda function repeatedly with each item in array, and returns the results
 * of all invocations in a new array of the same type (an `Array` or `Page`). As
 * `Map` processes array, each invocation of the lambda function can see the
 * effects of write operations from previous invocations.
 *
 * [API Reference](https://docs.fauna.com/fauna/current/api/fql/functions/map?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg} collection
 * The target `Array` over which the Lambda function iterates/operates.
 *
 * @param {ExprArg|Lambda} lambda_expr
 * The anonymous function to be executed.
 *
 * @returns
 * A new array of the same type omitting the first num elements.
 *
 * @example
 * q.Map([1, 2, 3], q.Lambda('x', q.Add(q.Var('x'), 1)))
 */
export function Map(collection: ExprArg, lambda_expr: ExprArg | Lambda): Expr;

/**
 * The `Merge` function combines two or more objects into one, by performing
 * a shallow merge of the fields and values from both objects into a new object.
 * You can provide an optional `customResolver` function that overrides the default
 * resolver, and is used to determine which value to use. When the resolver returns
 * a null value, `Merge` deletes that field in result.
 *
 * [API Reference](https://docs.fauna.com/fauna/v4/api/fql/functions/merge?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg} object
 * The first object to merge with the second object.
 *
 * @param {ExprArg} values
 * The second object, or array of objects, to merge with the first object.
 *
 * @param {Expr|Lambda} resolver
 * A lambda function that replaces the default resolver.
 *
 * @example
 * q.Merge(
 *  { a: 'Apple', b: 'Banana' },
 *  { x: 'width', y: 'height' }
 * )
 */
export function Merge(object: ExprArg,values: ExprArg,resolver?: Expr | Lambda): Expr;

/**
 * The `Foreach` function applies the `Lambda` serially to each member of an Array or Page,
 * and returns the original, unmodified array.
 *
 * The `Foreach` function is very useful when the original array does not need to be modified,
 * but a side effect is required for every value in an array. Later invocations of the Lambda
 * can see the side effects of earlier invocations of the Lambda.
 *
 * [API Reference](https://docs.fauna.com/fauna/v4/api/fql/functions/foreach?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg} collection
 * The Array or Page over which the `lambda` function iterates/operates.
 *
 * @param {Lambda} lambda_expr
 * The anonymous function to be executed.
 *
 * @example
 * q.Foreach(
 *  q.Paginate(q.Match(q.Index('name'), 'field')),
 *  q.Lambda('X', q.Var('X'))
 * )
 */
export function Foreach( collection: ExprArg, lambda_expr: ExprArg | Lambda): Expr;

/**
 * The `Filter` function applies the `Lambda` function to each member of `arrayOrSet`,
 * which is an Array, Page, or Set. The return value matches the `arrayOrSet` type, and
 * contains only those elements for which the `lambda` function returns `true`.
 *
 * [API Reference](https://docs.fauna.com/fauna/v4/api/fql/functions/filter?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg} collection
 * The group of items over which the lambda function iterates/operates.
 *
 * @param {Expr|Lambda} lambda_expr
 * The anonymous function to be executed, which must return a boolean.
 *
 * @example
 * q.Filter(
 *  [1, 2, 3],
 *  q.Lambda('i', q.Equals(0, q.Modulo(q.Var('i'), 2))),
 * )
 */
export function Filter(collection: ExprArg, lambda_expr: ExprArg | Lambda): Expr;

/**
 * The `Take` function returns a new array of the same type as the array parameter
 * that contains `num` elements from the head of the provided `array`. If `num` is
 * zero or negative, the resulting `array` is empty. When applied to a Page, the
 * returned page’s "after" cursor is adjusted to only cover the taken elements.
 *
 * [API Reference](https://docs.fauna.com/fauna/v4/api/fql/functions/take?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg} number
 * The Number of elements to extract from the beginning of array.
 *
 * @param {Expr|Lambda} collection
 * Extract elements from this Array.
 *
 * @example
 * q.Take(2, [1, 2, 3])
 */
export function Take(number: ExprArg, collection: ExprArg): Expr;

/**
 * The `Drop` function returns a new array of the same type that contains the remaining
 * elements, after `num` have been removed from the head of the array. If `num` is zero or
 * negative, all elements of the array are returned unmodified.
 *
 * [API Reference](https://docs.fauna.com/fauna/v4/api/fql/functions/drop?lang=javascript)
 *
 * ---
 *
 * @param {ExprArg} number
 * The number of elements to extract from the beginning of the array.
 *
 * @param {Expr|Lambda} collection
 * The drop operations should be performed on this array.
 *
 * @example
 * q.Drop(2, [1, 2, 3])
 */
export function Drop(number: ExprArg, collection: ExprArg): Expr
export function Prepend(elements: ExprArg, collection: ExprArg): Expr
export function Append(elements: ExprArg, collection: ExprArg): Expr
export function IsEmpty(collection: ExprArg): Expr
export function IsNonEmpty(collection: ExprArg): Expr
export function IsNumber(expr: ExprArg | null): Expr
export function IsDouble(expr: ExprArg | null): Expr
export function IsInteger(expr: ExprArg | null): Expr
export function IsBoolean(expr: ExprArg | null): Expr
export function IsNull(expr: ExprArg | null): Expr
export function IsBytes(expr: ExprArg | null): Expr
export function IsTimestamp(expr: ExprArg | null): Expr
export function IsDate(expr: ExprArg | null): Expr
export function IsString(expr: ExprArg | null): Expr
export function IsArray(expr: ExprArg | null): Expr
export function IsObject(expr: ExprArg | null): Expr
export function IsRef(expr: ExprArg | null): Expr
export function IsSet(expr: ExprArg | null): Expr
export function IsDoc(expr: ExprArg | null): Expr
export function IsLambda(expr: ExprArg | null): Expr
export function IsCollection(expr: ExprArg | null): Expr
export function IsDatabase(expr: ExprArg | null): Expr
export function IsIndex(expr: ExprArg | null): Expr
export function IsFunction(expr: ExprArg | null): Expr
export function IsKey(expr: ExprArg | null): Expr
export function IsToken(expr: ExprArg | null): Expr
export function IsCredentials(expr: ExprArg | null): Expr
export function IsRole(expr: ExprArg | null): Expr

export function Get(ref: ExprArg, ts?: ExprArg): Expr
export function KeyFromSecret(secret: ExprArg): Expr
export function Reduce(
  lambda: ExprArg,
  initial: ExprArg,
  collection: ExprArg
): Expr
export function Paginate(set: ExprArg, opts?: object): Expr
export function Exists(ref: ExprArg, ts?: ExprArg): Expr

export function Create(collection_ref: ExprArg, params?: ExprArg): Expr
export function Update(ref: ExprArg, params: ExprArg): Expr
export function Replace(ref: ExprArg, params: ExprArg): Expr
export function Delete(ref: ExprArg): Expr
export function Insert(
  ref: ExprArg,
  ts: ExprArg,
  action: ExprArg,
  params: ExprArg
): Expr
export function Remove(ref: ExprArg, ts: ExprArg, action: ExprArg): Expr
export function CreateClass(params: ExprArg): Expr
export function CreateCollection(params: ExprArg): Expr
export function CreateDatabase(params: ExprArg): Expr
export function CreateIndex(params: ExprArg): Expr
export function CreateKey(params: ExprArg): Expr
export function CreateFunction(params: ExprArg): Expr
export function CreateRole(params: ExprArg): Expr
export function CreateAccessProvider(params: ExprArg): Expr

export function Singleton(ref: ExprArg): Expr
export function Events(ref_set: ExprArg): Expr
export function Match(index: ExprArg, ...terms: ExprArg[]): Expr
export function Union(...sets: ExprArg[]): Expr
export function Intersection(...sets: ExprArg[]): Expr
export function Difference(...sets: ExprArg[]): Expr
export function Distinct(set: ExprArg): Expr
export function Join(source: ExprArg, target: ExprArg | Lambda): Expr

export function Range(
  set: ExprArg,
  from: ExprArg | null,
  to: ExprArg | null
): Expr
export function Login(ref: ExprArg, params: ExprArg): Expr
export function Logout(delete_tokens: ExprArg): Expr
export function Identify(ref: ExprArg, password: ExprArg): Expr
export function Identity(): Expr
export function CurrentIdentity(): Expr
export function HasIdentity(): Expr
export function HasCurrentIdentity(): Expr
export function CurrentToken(): Expr
export function HasCurrentToken(): Expr

export function Concat(strings: ExprArg, separator?: ExprArg): Expr
export function Casefold(string: ExprArg, normalizer?: ExprArg): Expr
export function ContainsStr(value: ExprArg, search: ExprArg): Expr
export function ContainsStrRegex(value: ExprArg, pattern: ExprArg): Expr
export function StartsWith(value: ExprArg, search: ExprArg): Expr
export function EndsWith(value: ExprArg, search: ExprArg): Expr
export function RegexEscape(value: ExprArg): Expr
export function FindStr(value: ExprArg, find: ExprArg, start?: ExprArg): Expr
export function FindStrRegex(
  value: ExprArg,
  find: ExprArg,
  start?: ExprArg,
  numResults?: ExprArg
): Expr
export function Length(expr: ExprArg): Expr
export function LowerCase(expr: ExprArg): Expr
export function LTrim(expr: ExprArg): Expr
export function NGram(terms: ExprArg, min?: ExprArg, max?: ExprArg): Expr
export function Repeat(expr: ExprArg, number?: ExprArg): Expr
export function ReplaceStr(expr: ExprArg, find: ExprArg, replace: ExprArg): Expr
export function ReplaceStrRegex(
  expr: ExprArg,
  find: ExprArg,
  replace: ExprArg,
  first?: ExprArg
): Expr
export function RTrim(expr: ExprArg): Expr
export function Space(expr: ExprArg): Expr
export function SubString(
  expr: ExprArg,
  start?: ExprArg,
  length?: ExprArg
): Expr
export function TitleCase(value: ExprArg): Expr
export function Trim(expr: ExprArg): Expr
export function UpperCase(expr: ExprArg): Expr
export function Format(string: ExprArg, values: ExprArg): Expr

export function Time(string: ExprArg): Expr
export function Epoch(number: ExprArg, unit: ExprArg): Expr
export function TimeAdd(base: ExprArg, offset: ExprArg, unit: ExprArg): Expr
export function TimeSubtract(
  base: ExprArg,
  offset: ExprArg,
  unit: ExprArg
): Expr
export function TimeDiff(start: ExprArg, finish: ExprArg, unit: ExprArg): Expr
export function Date(string: ExprArg): Expr
export function Now(): Expr
export function DayOfWeek(expr: ExprArg): Expr
export function DayOfYear(expr: ExprArg): Expr
export function DayOfMonth(expr: ExprArg): Expr
export function Hour(expr: ExprArg): Expr
export function Minute(expr: ExprArg): Expr
export function Second(expr: ExprArg): Expr
export function Year(expr: ExprArg): Expr
export function Month(expr: ExprArg): Expr

export function NextId(): Expr
export function NewId(): Expr
export function Database(name: ExprArg, scope?: ExprArg): Expr
export function Index(name: ExprArg, scope?: ExprArg): Expr
export function Class(name: ExprArg, scope?: ExprArg): Expr
export function Collection(name: ExprArg, scope?: ExprArg): Expr
export function Function(name: ExprArg, scope?: ExprArg): Expr
export function Role(name: ExprArg, scope?: ExprArg): Expr
export function AccessProviders(scope?: ExprArg): Expr
export function Databases(scope?: ExprArg): Expr
export function Classes(scope?: ExprArg): Expr
export function Collections(scope?: ExprArg): Expr
export function Indexes(scope?: ExprArg): Expr
export function Functions(scope?: ExprArg): Expr
export function Roles(scope?: ExprArg): Expr
export function Keys(scope?: ExprArg): Expr
export function Tokens(scope?: ExprArg): Expr
export function Credentials(scope?: ExprArg): Expr
export function Equals(...args: (ExprArg | null)[]): Expr
export function Contains(path: ExprArg, _in: ExprArg): Expr
export function Select(
  path: ExprArg,
  from: ExprArg,
  _default?: ExprArg | null
): Expr
export function SelectAll(path: ExprArg, from: ExprArg): Expr
export function Abs(expr: ExprArg): Expr
export function Add(...args: ExprArg[]): Expr
export function BitAnd(...args: ExprArg[]): Expr
export function BitNot(expr: ExprArg): Expr
export function BitOr(...args: ExprArg[]): Expr
export function BitXor(...args: ExprArg[]): Expr
export function Ceil(expr: ExprArg): Expr
export function Divide(...args: ExprArg[]): Expr
export function Floor(expr: ExprArg): Expr
export function Max(...args: ExprArg[]): Expr
export function Min(...args: ExprArg[]): Expr
export function Modulo(...args: ExprArg[]): Expr
export function Multiply(...args: ExprArg[]): Expr
export function Round(value: ExprArg, precision?: ExprArg): Expr
export function Subtract(...args: ExprArg[]): Expr
export function Sign(expr: ExprArg): Expr
export function Sqrt(expr: ExprArg): Expr
export function Trunc(value: ExprArg, precision?: ExprArg): Expr
export function Count(expr: ExprArg): Expr
export function Sum(expr: ExprArg): Expr
export function Mean(expr: ExprArg): Expr
export function Any(expr: ExprArg): Expr
export function All(expr: ExprArg): Expr
export function Acos(expr: ExprArg): Expr
export function Asin(expr: ExprArg): Expr
export function Atan(expr: ExprArg): Expr
export function Cos(expr: ExprArg): Expr
export function Cosh(expr: ExprArg): Expr
export function Degrees(expr: ExprArg): Expr
export function Exp(expr: ExprArg): Expr
export function Hypot(value: ExprArg, exp?: ExprArg): Expr
export function Ln(expr: ExprArg): Expr
export function Log(expr: ExprArg): Expr
export function Pow(value: ExprArg, exp?: ExprArg): Expr
export function Radians(expr: ExprArg): Expr
export function Sin(expr: ExprArg): Expr
export function Sinh(expr: ExprArg): Expr
export function Tan(expr: ExprArg): Expr
export function Tanh(expr: ExprArg): Expr
export function LT(...args: ExprArg[]): Expr
export function LTE(...args: ExprArg[]): Expr
export function GT(...args: ExprArg[]): Expr
export function GTE(...args: ExprArg[]): Expr
export function And(...args: ExprArg[]): Expr
export function Or(...args: ExprArg[]): Expr
export function Not(bool: ExprArg): Expr

export function ToString(expr: ExprArg | null): Expr
export function ToNumber(expr: ExprArg): Expr
export function ToObject(expr: ExprArg): Expr
export function ToArray(expr: ExprArg): Expr
export function ToDouble(expr: ExprArg): Expr
export function ToInteger(expr: ExprArg): Expr
export function ToTime(expr: ExprArg): Expr
export function ToDate(expr: ExprArg): Expr
export function ToSeconds(expr: ExprArg): Expr
export function ToMillis(expr: ExprArg): Expr
export function ToMicros(expr: ExprArg): Expr

export function MoveDatabase(from: ExprArg, to: ExprArg): Expr
export function Documents(collection: ExprArg): Expr
export function ContainsPath(path: ExprArg, _in: ExprArg): Expr
export function ContainsField(field: string, _in: ExprArg): Expr
export function ContainsValue(value: ExprArg | null, _in: ExprArg): Expr
export function Reverse(expr: ExprArg): Expr

export function AccessProvider(name: ExprArg): Expr
