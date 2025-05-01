import pickle

def load_embeddings(path="../index/context_embeddings.pkl"):
    with open(path, "rb") as f:
        embeddings, texts = pickle.load(f)
    return embeddings, texts
