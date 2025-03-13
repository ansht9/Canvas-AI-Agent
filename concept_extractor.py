import boto3

class ConceptExtractor:
    def __init__(self, course_name: str):
        self.client = boto3.client(
            "bedrock-agent-runtime",
            region_name="us-west-2",
            aws_access_key_id="",
            aws_secret_access_key="",
        )

        self.prompt = f"What are all the key concepts of {course_name}?"

    def extract_concepts(self) -> list[str]:
        response = self.client.invoke_agent(
            agentAliasId="FJA1272LIK",
            agentId="XJJVOCLPSB",
            sessionId="random",
            inputText=self.prompt,
        )

        concepts = ""
        for event in response.get("completion"):
            if "chunk" in event:
                chunk = event["chunk"]
                concepts += chunk["bytes"].decode("utf-8")

        concepts = concepts.split(" - ")[1:]
        return concepts