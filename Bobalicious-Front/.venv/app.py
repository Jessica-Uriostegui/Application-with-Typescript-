from flask import Flask

app = Flask(__name__)
@app.route("/api/users", method=["GET"])
def users():
    return(
        {
            "users": [
                "Alice",
                 "Bob",
                 "Charlie"
            ]
        }
    )

if __name__ == "__main__":
    app.run(debug=True)


