import store from "../../lib/store";

export default function handler(req, res) {
  if (req.method === "GET") return res.status(200).json(store.listarTarefas());
  if (req.method === "POST") return res.status(201).json(store.criarTarefa(req.body || {}));
  if (req.method === "PUT") {
    const t = store.alternarTarefa(req.body?.id);
    return t ? res.status(200).json(t) : res.status(404).json({ erro: "Não encontrada" });
  }
  return res.status(405).json({ erro: "Método não permitido" });
}
