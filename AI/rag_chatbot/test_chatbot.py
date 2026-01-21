from rag_system import chatbot

# Test the chatbot
if __name__ == "__main__":
    # Test 1: Resume improvement
    response1 = chatbot.ask("How can I improve my resume?")
    print("Q1:", response1['question'])
    print("A1:", response1['answer'])
    print("\n" + "="*50 + "\n")
    
    # Test 2: Interview prep
    response2 = chatbot.ask("How should I prepare for a MERN internship interview?")
    print("Q2:", response2['question'])
    print("A2:", response2['answer'])
    print("\n" + "="*50 + "\n")
    
    # Test 3: With user profile
    student_profile = {
        "skills": ["Python", "HTML", "CSS"],
        "projects": 2,
        "college_tier": "Tier-2"
    }
    response3 = chatbot.ask("What should I learn next to get a better internship?", student_profile)
    print("Q3:", response3['question'])
    print("A3:", response3['answer'])