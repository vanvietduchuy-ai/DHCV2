
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResponse } from "../types";

export const analyzeDocument = async (text: string, imageData?: { data: string, mimeType: string }): Promise<AnalysisResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemPrompt = `Bạn là "Trợ lý Số Tổ Tổng hợp - Công an Phường Nam Đông Hà". Nhiệm vụ của bạn là đọc ảnh chụp văn bản (Công văn, Kế hoạch, Điện chỉ đạo, Thông báo...) để trích xuất thông tin hành chính công an chính xác.

QUY TRÌNH OCR TÀI LIỆU CÔNG AN:
1. SỐ HIỆU: Trích xuất số hiệu văn bản đầy đủ (Ví dụ: 123/KH-CAP, 45/BC-CAP, 01/Đ-CATP...).
2. ĐƠN VỊ BAN HÀNH: Xác định cơ quan ký văn bản (Công an Thành phố, UBND Phường, Công an Tỉnh...).
3. NỘI DUNG TRỌNG TÂM: Tóm tắt yêu cầu thực hiện nhiệm vụ trong 1-2 câu ngắn gọn, súc tích.
4. HẠN BÁO CÁO: Tìm mốc thời gian yêu cầu báo cáo kết quả. Định dạng YYYY-MM-DD.

PHÂN TÍCH THỜI GIAN:
- Ngày hiện tại hệ thống: 06/01/2026.
- Nếu văn bản không ghi rõ hạn, hãy đề xuất hạn báo cáo sau 3 ngày làm việc kể từ ngày hiện tại.

DANH SÁCH CBCS (Ghi chú để khớp thông tin):
Lê Đình Thắng, Lê Quốc Tuấn, Nguyễn Thị Hảo, Phan Thị Anh Đào, Nguyễn Thị Hường, Nguyễn Quỳnh Trang, Cao Phương Hằng, Nguyễn Thị Thu Sương, Nguyễn Đình Nguyên, Hoàng Hương Quỳnh, Nguyễn Khánh Linh, Hoàng Phi Hải, Nguyễn Thị Như Huế, Văn Viết Đức Huy, Lê Quang Chung, Dương Văn Tiến Đạt.

YÊU CẦU ĐẦU RA: Trả về JSON theo đúng schema. Nội dung phải nghiêm túc, chuẩn văn phong hành chính công an.`;

  const parts: any[] = [
    { text: systemPrompt },
    { text: text || "Trích xuất thông tin từ văn bản chỉ đạo này." }
  ];
  
  if (imageData) {
    parts.push({
      inlineData: {
        data: imageData.data,
        mimeType: imageData.mimeType
      }
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, description: "Loại văn bản (Công văn/Kế hoạch/Điện...)" },
          number: { type: Type.STRING, description: "Số hiệu văn bản" },
          content: { type: Type.STRING, description: "Nội dung trọng tâm thực hiện" },
          lead: { type: Type.STRING, description: "Đơn vị ban hành văn bản" },
          deadline: { type: Type.STRING, description: "Hạn báo cáo (YYYY-MM-DD)" },
          priority: { type: Type.STRING, enum: ["Cao", "Trung bình", "Thấp"] },
          nextSteps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Các bước thực hiện nhiệm vụ"
          },
        },
        required: ["type", "content", "lead", "deadline", "priority", "nextSteps"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text);
    return result as AnalysisResponse;
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Lỗi hệ thống OCR Công an. Vui lòng kiểm tra lại chất lượng ảnh chụp.");
  }
};