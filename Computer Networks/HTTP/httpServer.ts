import net from "net";

const tcpServer = net.createServer((socket) => {
  console.log("Client Connected");
  socket.write("hello\r\n");
  socket.on("end", () => {
    console.log("Client disconnected");
  });

  let requestData = "";
  socket.on("data", (chunk) => {
    requestData += chunk.toString();

    const httpResponseStatusLine = "HTTP/1.1 200 OK\r\n";
    const httpResponseHeaders =
      "Content-Type: text/plain\r\nContent-Length: 12\r\n";
    const httpResponseBody = "Hello World!\r\n";

    const httpResponse =
      httpResponseStatusLine + httpResponseHeaders + httpResponseBody;

    socket.write(httpResponse);

    socket.on("end", () => {
      console.log("Client disconnected");
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  });

  tcpServer.on("error", (err) => {
    throw err;
  });
});

tcpServer.listen("8124", () => {
  console.log(`server is listening 8124`);
});
