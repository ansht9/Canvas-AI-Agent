import boto3
import json

class QuestionAnswerGenerator:
    def __init__(self, course_name: str):
        self.client = boto3.client(
            "bedrock-agent-runtime",
            region_name="us-west-2",
            aws_access_key_id="AKIATP4HLUNMKD3YKM4W",
            aws_secret_access_key="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",
        )

        self.course_name = course_name

    def generate_qa_pair(self, concept: str) -> dict:
        prompt = f"""
From the {self.course_name} course, generate a question-answer pair within the concept of "{concept}" a quiz that will help reinforce that concept in the student's mind. Your response should be in JSON format, in:

{{
    "concept": "CONCEPT OF THE QUESTION"
    "question": "YOUR GENERATED QUESTION",
    "answer": "ANSWER TO YOUR QUESTION"
}}"""
        response = self.client.invoke_agent(
            agentAliasId="V8INGFH1WW",
            agentId="1CJPZSLCJH",
            sessionId="random",
            inputText=prompt,
        )

        qa_pair = ""
        for event in response.get("completion"):
            if "chunk" in event:
                chunk = event["chunk"]
                qa_pair += chunk["bytes"].decode("utf-8")

        return json.loads(qa_pair)
