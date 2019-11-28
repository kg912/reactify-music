const replaceUrlParams = (
  baseUrl = '',
  params: { [s: string]: string } | any = {}
) => {
  let url = baseUrl;

  for (let key of Object.keys(params)) {
    url = url.replace(`{{${key}}}`, encodeURIComponent(params[key]));
  }

  return url;
};

export default replaceUrlParams;
