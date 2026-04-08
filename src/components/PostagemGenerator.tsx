"use client";

import { useState, useCallback } from "react";

type AudioType = "Dublado" | "Legendado" | "Dublado e Legendado";

interface FormData {
  nome: string;
  ano: string;
  audio: AudioType;
}

const AUDIO_OPTIONS: AudioType[] = ["Dublado", "Legendado", "Dublado e Legendado"];

const PIX_KEY = "chayannytj4@gmail.com";
const TELEGRAM_USER = "@chayanny";

function gerarPostagem(data: FormData): string {
  const { nome, ano, audio } = data;

  return [
    `🍿 | ${nome}`,
    `__________`,
    `📅 | ${ano}`,
    `__________`,
    `💬 | ${audio}`,
    `__________`,
    `💰 Contribuição Única de 3,50`,
    ``,
    `📩 Envie o comprovante para ${TELEGRAM_USER}, diga seu pedido e receberá o link do filme no drive.`,
    ``,
    `🔑 Chave Pix: ${PIX_KEY}`,
  ].join("\n");
}

export default function PostagemGenerator() {
  const [form, setForm] = useState<FormData>({
    nome: "",
    ano: new Date().getFullYear().toString(),
    audio: "Dublado",
  });

  const [copied, setCopied] = useState(false);

  const handleChange = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const postagem = form.nome.trim() ? gerarPostagem(form) : null;

  const handleCopy = useCallback(async () => {
    if (!postagem) return;
    await navigator.clipboard.writeText(postagem);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [postagem]);

  const handleReset = useCallback(() => {
    setForm({
      nome: "",
      ano: new Date().getFullYear().toString(),
      audio: "Dublado",
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-mono">
      <div className="max-w-xl mx-auto space-y-6">

        {/* Header */}
        <div className="border-b border-zinc-800 pb-4">
          <h1 className="text-lg font-semibold tracking-tight">
            Gerador de Postagem
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Canal Filmes & Séries no Drive
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">
              Nome do filme / série
            </label>
            <input
              type="text"
              placeholder="Ex: Bad Boys 4"
              value={form.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 uppercase tracking-wider">
                Ano
              </label>
              <input
                type="text"
                placeholder="Ex: 2024"
                value={form.ano}
                onChange={(e) => handleChange("ano", e.target.value)}
                maxLength={4}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400 uppercase tracking-wider">
                Áudio
              </label>
              <select
                value={form.audio}
                onChange={(e) => handleChange("audio", e.target.value as AudioType)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-600 transition-colors cursor-pointer"
              >
                {AUDIO_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <span className="text-xs text-zinc-400 uppercase tracking-wider">
            Prévia
          </span>
          <div className="bg-zinc-900 border border-zinc-800 rounded p-4 min-h-[200px]">
            {postagem ? (
              <pre className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
                {postagem}
              </pre>
            ) : (
              <p className="text-sm text-zinc-600 italic">
                Preencha o nome para gerar a postagem...
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            disabled={!postagem}
            className="flex-1 bg-zinc-100 text-zinc-900 rounded px-4 py-2 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
          >
            {copied ? "Copiado!" : "Copiar postagem"}
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-zinc-500 border border-zinc-800 rounded hover:border-zinc-600 hover:text-zinc-300 transition-colors"
          >
            Limpar
          </button>
        </div>

      </div>
    </div>
  );
}
