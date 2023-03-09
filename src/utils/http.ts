import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { ElLoading, ElMessage } from "element-plus";
// 请求存储到map中
function setRequestMap(config: InternalAxiosRequestConfig, map: Map<string, AbortController>) {
  const controller = new AbortController();
  let { url, method, params, data } = config;
  const key = [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
  config.signal = controller.signal;
  map.set(key, controller);
}

// 清除map中的一个请求
function deleteRequestMap(config: AxiosResponse, map: Map<string, AbortController>) {
  let { url, method, params, data } = config.config;
  const key = [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
  map.delete(key);
}

class FsRequest {
  // axios实例
  instance: AxiosInstance;
  // 取消请求Map容器
  abortControllerMap: Map<string, AbortController>;

  // 控制独立请求loading
  loading: any;

  loadingCount: number;

  // 创建axios实例，封装全局拦截器
  constructor(options: { baseURL: string; timeout: number }) {
    this.instance = axios.create(options);
    this.abortControllerMap = new Map();
    this.loadingCount = 0;

    this.instance.interceptors.request.use((config) => {
      setRequestMap(config, this.abortControllerMap);

      // 配置请求头token
      const token = localStorage.getItem("token");
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    this.instance.interceptors.response.use((config) => {
      deleteRequestMap(config, this.abortControllerMap);
      return config.data;
    });
  }

  // 取消全部请求
  cancelAllRequest() {
    for (const [key, controller] of this.abortControllerMap) {
      controller.abort();
    }
    this.abortControllerMap.clear();
  }

  request<T>(config: AxiosRequestConfig): Promise<T> {
    // this.loading = ElLoading.service({
    //   lock: true,
    //   text: "Loading",
    //   background: "rgba(0, 0, 0, 0.7)",
    // });
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        )
        .finally(() => {
          // this.loading.close();
        });
    });
  }

  get<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ method: "GET", ...config });
  }

  post<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ method: "POST", ...config });
  }

  uploadFilePost<T>(config: AxiosRequestConfig): Promise<T> {
    config.headers = { "Content-Type": "multipart/form-data" };
    return this.request<T>({ ...config, method: "POST" });
  }
}

export default FsRequest;
