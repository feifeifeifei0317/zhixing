"""
使用AI增强的文本转PPT服务
"""
from services.text_to_ppt import TextToPPTService
from services.ai_service import LLMService
import asyncio


class AITextToPPTService(TextToPPTService):
    """AI增强的文本转PPT服务"""
    
    def __init__(self, ai_provider: str = "baidu"):
        super().__init__()
        self.llm_service = LLMService(provider=ai_provider)
    
    async def generate_ppt(self, text: str) -> str:
        """
        使用AI增强生成PPT
        
        Args:
            text: 输入的文本内容
            
        Returns:
            PPT文件路径
        """
        # 使用AI增强文本结构
        print(f"正在使用AI分析文本内容（长度: {len(text)} 字符）...")
        try:
            enhanced_structure = await self.llm_service.enhance_text_to_ppt(text)
            print(f"[INFO] AI分析完成")
        except Exception as e:
            print(f"[WARN] AI分析失败，使用基础解析: {str(e)}")
            import traceback
            traceback.print_exc()
            # 如果AI失败，使用基础服务
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(
                None,
                super()._generate_ppt_sync,
                text
            )
        
        # 使用增强后的结构生成PPT
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(
            None,
            self._generate_ppt_from_structure,
            enhanced_structure
        )
    
    def _generate_ppt_from_structure(self, structure: dict) -> str:
        """根据AI生成的结构创建精美的PPT"""
        from pptx import Presentation
        from pptx.util import Inches
        
        # 创建演示文稿
        prs = Presentation()
        prs.slide_width = Inches(10)
        prs.slide_height = Inches(7.5)
        
        # 生成精美的标题页
        title = structure.get("title", "课程演示")
        self._create_title_slide(prs, title)
        
        # 为每个章节创建幻灯片
        sections = structure.get("sections", [])
        print(f"AI返回的结构包含 {len(sections)} 个章节")
        
        if not sections:
            print("[WARN] AI返回的结构中没有章节，使用基础解析")
            # 如果AI没有返回有效结构，使用基础解析
            # 这里需要传入原始文本，但我们现在没有，所以使用基础结构
            # 创建一个简单的章节结构
            sections = [{
                "title": structure.get("title", "课程内容"),
                "points": ["请检查AI服务配置，或使用基础文本转PPT功能"]
            }]
        
        for idx, section in enumerate(sections):
            print(f"处理章节 {idx+1}/{len(sections)}: {section.get('title', '未命名章节')}")
            
            # 确保points是列表
            points = section.get("points", [])
            if isinstance(points, str):
                points = [points]
            elif not isinstance(points, list):
                points = []
            
            print(f"处理章节 '{section.get('title', '章节')}'，共 {len(points)} 个要点")
            
            # 创建精美的章节幻灯片
            section_dict = {
                'title': section.get("title", "章节"),
                'points': [str(p) if not isinstance(p, str) else p for p in points]
            }
            self._create_section_slides(prs, section_dict)
        
        # 添加精美的结束页
        self._create_end_slide(prs)
        
        # 保存PPT
        output_path = self.temp_dir / f"presentation_ai_{id(structure)}.pptx"
        prs.save(str(output_path))
        
        return str(output_path)

