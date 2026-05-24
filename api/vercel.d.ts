declare module "@vercel/node" {
  interface VercelRequest {
    query: Record<string, string>;
    body: any;
    headers: Record<string, string>;
    method: string;
    url: string;
  }
  interface VercelResponse {
    status(code: number): VercelResponse;
    json(data: any): void;
    send(data: any): void;
  }
}
