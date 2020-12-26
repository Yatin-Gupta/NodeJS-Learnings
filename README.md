### NodeJS Tutorial

- NodeJS is a javascript run time environment, or we can say entension to Javascript V8 Engine.
- It adds capabilities such as reading from file to Javascript and written in C++.
- In NodeJS, global object is called **global** itself, not like browser where it is **window**.
- Like on **window** we got multiple methods such as setTimeout, setInterval, console similar methods are available on NodeJS **global** object.
- To get path to current directory in nodejs use **\_\_dirname**.
- To get path to current executing file in nodejs use **\_\_filename**.
- In NodeJS, there is a single event loop that keep looking for the event in event queue and if it finds event, then it execute it for some time and then execute next event. To come out of event loop or leave program we can use **process.exit()**.
- In NodeJS Event loop is responsible for calling all the event callbacks. Event callbacks are not expected to contain time consuming logic. The action which caused event, For ex: If you are reading file and you have passed callback to it, so that callback will be called once file will be read, so in this case action is FILE_READ. This FILE_READ action will not be handled by NodeJS. This will be handled in Worked Pool(initiate by NodeJS) that closely interact with OS can be multi threaded.
- All the Heavy Lifting is done is worker pool.
- Even loop keep executing or iterating. At the begining of iteration, it first checks for Timers(setTimeout/setInterval)(**Time Phase**) callbacks. If any timer callback is due, event loop will execute it. Then continuing the iteration(**Pending Callback** phase) it will check for I/O/Network related pending/due callbacks. If callbacks are long and there are too many callbacks, event loop can postpone the execution to next iteration. All those callbacks not able to execute in current iteration are registered in pending/due IO callbacks. Then Even loop comes in **Polling phase** i.e it look for any new IO or network event(like incomming requests). If it is unable to execute any available IO or network event then it will be registered in Pending/Due callbacks and will be executed in next iteration. If in middle of iteration any timer callback get due, then even loop will leave IO/Network callback there and execute timer callback first. So Timer callbacks have high priority over IO/Network callbacks. Then comes the **Check** phase in which event loop execute setImmediate callback and then comes **Close Callbacks** phase where even loop execute all the close event callbacks.
- Use **setImmediate** if you want to queue the function behind whatever I/O event callbacks that are already in the event queue. Use **process.nextTick** to effectively queue the function at the head of the event queue so that it executes immediately after the current function completes.
- So in a case where you're trying to break up a long running, CPU-bound job using recursion, you would now want to use **setImmediate** rather than **process.nextTick** to queue the next iteration as otherwise any I/O event callbacks wouldn't get the chance to run between iterations.
- Here is the code that shows setImmediate/setTimeout/process.nextTick and various asynchronous fns working:

```
import fs from 'fs';
import http from 'http';

const options = {
  host: 'www.stackoverflow.com',
  port: 80,
  path: '/index.html'
};

describe('deferredExecution', () => {
  it('deferredExecution', (done) => {
    console.log('Start');//L0
    setTimeout(() => console.log('TO1'), 0);//L1
    setImmediate(() => console.log('IM1'));//L2
    process.nextTick(() => console.log('NT1'));//L3
    setImmediate(() => console.log('IM2'));//L4
    process.nextTick(() => console.log('NT2'));//L5
    http.get(options, () => console.log('IO1'));//L6
    fs.readdir(process.cwd(), () => console.log('IO2'));//L7
    setImmediate(() => console.log('IM3'));//L8
    process.nextTick(() => console.log('NT3'));//L9
    setImmediate(() => console.log('IM4'));//L10
    fs.readdir(process.cwd(), () => console.log('IO3'));//L11
    console.log('Done');//L12
    setTimeout(done, 1500);//L13
  });
});
```

And Here is output:

```
Start
Done
NT1
NT2
NT3
TO1
IO2
IO3
IM1
IM2
IM3
IM4
IO1
```

Here is explaination:

> Callbacks deferred with process.nextTick() run before any other I/O event is fired, while with setImmediate(), the execution is queued behind any I/O event that is already in the queue. Reference: [setImmediate vs. nextTick](https://stackoverflow.com/questions/15349733/setimmediate-vs-nexttick)

JS Engine will **execute L0**, then from L1 to L11, it find all asynchronous events so register them in event loop and worker pool. Then it **execute L12** and register L13 with event loop and worker pool. Now Event loop in first iteration **execute L3, L5 and L9**, this is because process.nextTick push these callbacks at start of timer callback queue. Next **execute L1 and L13(if timer callback get due)**, next event loop goes to pending callback phase where it look for all pending IO/Network event callback. In first iteration, it may find nothing(let us assume), so it moves to Polling phase where it look for new due IO/Network event callbacks. There it **execute L6(if available),L7,L11**, then comes to Check phase where it look for setImmediate due time calls, where it execute **L2,L4,L8,L10**. It might be possible if L13 gets available in Polling phase, event loop will run to execute it, adding all L6,L7 and L11 in Pending phase and agains enter to Timer Phase and repeats the cycle.

- **process.cwd()** returns the current working directory i.e directory in which node is run while **\_\_dirname** returns the parent directory of file of whose code is executing.
