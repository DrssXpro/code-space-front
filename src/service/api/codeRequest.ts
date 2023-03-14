import type { ISquareCodePayload } from "@/types/codeType";
import type { IResponseData } from "@/types/responseType";
import { myRequest } from "..";

// 广场分享代码
function addCodeBySquare(payload: ISquareCodePayload) {
  return myRequest.post<IResponseData>({
    url: "/square_code/add",
    data: payload,
  });
}

export { addCodeBySquare };
