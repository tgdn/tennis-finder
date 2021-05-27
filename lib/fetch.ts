export default async function fetcher<T>(
  url: string,
  args: Record<string, any> = {},
  req: Record<string, any> = {}
): Promise<T> {
  args = {
    ...args,
    credentials: "include",
    headers: {
      Cookie: req.headers?.cookie,
      "Content-Type": "application/json",
      ...(args?.headers || {}),
    },
  };

  // include data in post
  const data = args["data"];
  if (data) {
    args["body"] = JSON.stringify(data);
    delete args["data"];
  }

  // if (["post", "put", "delete"].indexOf(args.method?.toLowerCase()) !== -1) {
  //   const csrf = Cookies.get("revive_csrf");
  //   args.headers["x-csrftoken"] = csrf;
  // }

  const res = await fetch(url, args);
  if (!res.ok) {
    throw res;
  }
  return res.json();
}
