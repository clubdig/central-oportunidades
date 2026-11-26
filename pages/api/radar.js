import { buscarRadar } from "../../lib/radar";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ erro: "Método não permitido" });
  const dias = Math.min(Math.max(Number(req.query.dias || 3), 1), 7);
  try {
    const itens = await buscarRadar(dias, 8);
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    return res.status(200).json({ quando: new Date().toISOString(), dias, total: itens.length, itens });
  } catch (e) {
    return res.status(502).json({ erro: "Falha ao consultar PNCP: " + e.message });
  }
}
