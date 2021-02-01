## Testing instructions
1. Run a php server pointing at the fixture directory:
```
php -S localhost:8000 -t fixture
```
2. Install the node dependencies
```
npm ci
```
3. Run Selenium in a separate terminal session
```
java -jar bazel-bin/java/server/src/org/openqa/selenium/grid/selenium_server_deploy.jar standalone
```
4. Run the test
```
node index.js
```

### Expectation
It should be possible to configure Selenium's Netty client to wait for at least the timeouts configured via the `setTimeouts` command

### Reality
```
11:49:50.994 WARN [SpanWrappedHttpHandler.execute] - Unable to execute request: NettyHttpHandler request execution error
java.lang.RuntimeException: NettyHttpHandler request execution error
	at org.openqa.selenium.remote.http.netty.NettyHttpHandler.makeCall(NettyHttpHandler.java:76)
	at org.openqa.selenium.remote.http.AddSeleniumUserAgent.lambda$apply$0(AddSeleniumUserAgent.java:42)
	at org.openqa.selenium.remote.http.Filter.lambda$andFinally$1(Filter.java:56)
	at org.openqa.selenium.remote.http.netty.NettyHttpHandler.execute(NettyHttpHandler.java:49)
	at org.openqa.selenium.remote.http.AddSeleniumUserAgent.lambda$apply$0(AddSeleniumUserAgent.java:42)
	at org.openqa.selenium.remote.http.Filter.lambda$andFinally$1(Filter.java:56)
	at org.openqa.selenium.remote.http.netty.NettyClient.execute(NettyClient.java:75)
	at org.openqa.selenium.remote.tracing.TracedHttpClient.execute(TracedHttpClient.java:55)
	at org.openqa.selenium.grid.web.ReverseProxyHandler.execute(ReverseProxyHandler.java:100)
	at org.openqa.selenium.grid.node.ProtocolConvertingSession.execute(ProtocolConvertingSession.java:75)
	at org.openqa.selenium.grid.node.local.SessionSlot.execute(SessionSlot.java:115)
	at org.openqa.selenium.grid.node.local.LocalNode.executeWebDriverCommand(LocalNode.java:375)
	at org.openqa.selenium.grid.node.ForwardWebDriverCommand.execute(ForwardWebDriverCommand.java:35)
	at org.openqa.selenium.remote.http.Route$PredicatedRoute.handle(Route.java:373)
	at org.openqa.selenium.remote.http.Route.execute(Route.java:68)
	at org.openqa.selenium.remote.tracing.SpanWrappedHttpHandler.execute(SpanWrappedHttpHandler.java:86)
	at org.openqa.selenium.remote.http.Filter$1.execute(Filter.java:64)
	at org.openqa.selenium.remote.http.Route$CombinedRoute.handle(Route.java:336)
	at org.openqa.selenium.remote.http.Route.execute(Route.java:68)
	at org.openqa.selenium.grid.node.Node.execute(Node.java:239)
	at org.openqa.selenium.grid.web.CombinedHandler.execute(CombinedHandler.java:59)
	at org.openqa.selenium.grid.web.RoutableHttpClientFactory$1.execute(RoutableHttpClientFactory.java:66)
	at org.openqa.selenium.grid.web.ReverseProxyHandler.execute(ReverseProxyHandler.java:100)
	at org.openqa.selenium.grid.router.HandleSession.execute(HandleSession.java:102)
	at org.openqa.selenium.remote.http.Route$PredicatedRoute.handle(Route.java:373)
	at org.openqa.selenium.remote.http.Route.execute(Route.java:68)
	at org.openqa.selenium.remote.http.Route$CombinedRoute.handle(Route.java:336)
	at org.openqa.selenium.remote.http.Route.execute(Route.java:68)
	at org.openqa.selenium.grid.router.Router.execute(Router.java:90)
	at org.openqa.selenium.grid.web.CheckOriginHeader.lambda$apply$0(CheckOriginHeader.java:66)
	at org.openqa.selenium.grid.web.CheckContentTypeHeader.lambda$apply$0(CheckContentTypeHeader.java:70)
	at org.openqa.selenium.remote.http.Filter$1.execute(Filter.java:64)
	at org.openqa.selenium.remote.http.Route$CombinedRoute.handle(Route.java:336)
	at org.openqa.selenium.remote.http.Route.execute(Route.java:68)
	at org.openqa.selenium.remote.http.Route$NestedRoute.handle(Route.java:270)
	at org.openqa.selenium.remote.http.Route.execute(Route.java:68)
	at org.openqa.selenium.remote.http.Route$CombinedRoute.handle(Route.java:336)
	at org.openqa.selenium.remote.http.Route.execute(Route.java:68)
	at org.openqa.selenium.remote.AddWebDriverSpecHeaders.lambda$apply$0(AddWebDriverSpecHeaders.java:35)
	at org.openqa.selenium.remote.ErrorFilter.lambda$apply$0(ErrorFilter.java:44)
	at org.openqa.selenium.remote.http.Filter$1.execute(Filter.java:64)
	at org.openqa.selenium.remote.ErrorFilter.lambda$apply$0(ErrorFilter.java:44)
	at org.openqa.selenium.remote.http.Filter$1.execute(Filter.java:64)
	at org.openqa.selenium.netty.server.SeleniumHandler.lambda$channelRead0$0(SeleniumHandler.java:44)
	at java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:515)
	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264)
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)
	at java.base/java.lang.Thread.run(Thread.java:834)
Caused by: java.util.concurrent.ExecutionException: java.util.concurrent.TimeoutException: Request timeout to localhost/127.0.0.1:36244 after 60000 ms
	at java.base/java.util.concurrent.CompletableFuture.reportGet(CompletableFuture.java:395)
	at java.base/java.util.concurrent.CompletableFuture.get(CompletableFuture.java:2022)
	at org.asynchttpclient.netty.NettyResponseFuture.get(NettyResponseFuture.java:206)
	at org.openqa.selenium.remote.http.netty.NettyHttpHandler.makeCall(NettyHttpHandler.java:59)
	... 48 more
Caused by: java.util.concurrent.TimeoutException: Request timeout to localhost/127.0.0.1:36244 after 60000 ms
	at org.asynchttpclient.netty.timeout.TimeoutTimerTask.expire(TimeoutTimerTask.java:43)
	at org.asynchttpclient.netty.timeout.RequestTimeoutTimerTask.run(RequestTimeoutTimerTask.java:50)
	at io.netty.util.HashedWheelTimer$HashedWheelTimeout.expire(HashedWheelTimer.java:672)
	at io.netty.util.HashedWheelTimer$HashedWheelBucket.expireTimeouts(HashedWheelTimer.java:747)
	at io.netty.util.HashedWheelTimer$Worker.run(HashedWheelTimer.java:472)
	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
	... 1 more
  ```
