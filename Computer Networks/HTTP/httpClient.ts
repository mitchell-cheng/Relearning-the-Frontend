import net from "net";

const tcpClient = net.createConnection(8124, "localhost", () => {
  console.log("Connected to the server!");

  const httpRequestLine = "GET / HTTP/1.1\r\n";
  const httpRequestHeaders =
    "Host: localhost:8124\r\nUser-Agent: Node.js HTTP Client\r\nAccept: */*\r\n";
  const httpRequest = httpRequestLine + httpRequestHeaders;
  tcpClient.write(httpRequest);
  console.log("first request sent!\r\n");

  const httpRequestLinePOST = "POST / HTTP/1.1\r\n";
  const httpRequestHHeadersPOST =
    "Host: localhost:8124\r\nUser-Agent: Node.js HTTP Client\r\nAccept: */*\r\nContent-Length: 5\r\n";
  const httpRequestBody = "Hello";
  const httpRequestPOST =
    httpRequestLinePOST + httpRequestHHeadersPOST + httpRequestBody;
  tcpClient.write(httpRequestPOST);
  console.log("second request sent!\r\n");
});

tcpClient.on("data", (data) => {
  console.log("Received response:\r\n", data.toString());
});

tcpClient.on("end", () => {
  console.log("Disconnected from the server");
});

tcpClient.on("error", (err) => {
  console.error("Socket error:", err);
});
