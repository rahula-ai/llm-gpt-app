from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")

    # Fake AI logic (replace later)
    if user_message.lower() == "admin":
        reply = "FLAG{hidden_flag}"
    else:
        reply = f"You said: {user_message}"

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host='0.0.0,0', debug=True)
