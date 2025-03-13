from qa_generator import QuestionAnswerGenerator
import random

concepts = [
    "Evolutionary algorithms such as genetic algorithms",
    "Genetic programming",
    "Artificial neural networks",
    "Swarm intelligence",
    "Artificial immune systems",
    "Developmental systems",
    "Learning classifier systems",
]

concept = random.choice(concepts)
print("Chosen concept:", concept)

qa_generator = QuestionAnswerGenerator("CSE 598 Bio-Inspired AI")
qa_pair = qa_generator.generate_qa_pair(concept)

print(qa_pair)
