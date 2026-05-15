"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const validStatuses = ["Demo", "En desarrollo", "Completado"];

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readList(formData: FormData, key: string) {
  return readText(formData, key)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getProjectData(formData: FormData) {
  const title = readText(formData, "title");
  const rawSlug = readText(formData, "slug");
  const status = readText(formData, "status");

  return {
    title,
    slug: normalizeSlug(rawSlug || title),
    category: readText(formData, "category"),
    shortDescription: readText(formData, "shortDescription"),
    description: readText(formData, "description"),
    technologies: readList(formData, "technologies"),
    features: readList(formData, "features"),
    status: validStatuses.includes(status) ? status : "Demo",
    imageUrl: readText(formData, "imageUrl"),
    githubUrl: readText(formData, "githubUrl") || "#",
    demoUrl: readText(formData, "demoUrl") || "#",
    featured: formData.get("featured") === "on",
  };
}

function revalidateProjectViews() {
  revalidatePath("/");
  revalidatePath("/proyectos");
  revalidatePath("/admin/proyectos");
}

async function requireAdmin() {
  const session = await auth();
  const userEmail = session?.user?.email;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!userEmail || !adminEmail || userEmail !== adminEmail) {
    throw new Error("No autorizado");
  }
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  await prisma.project.create({
    data: getProjectData(formData),
  });

  revalidateProjectViews();
}

export async function updateProject(formData: FormData) {
  await requireAdmin();

  const id = readText(formData, "id");

  if (!id) {
    return;
  }

  await prisma.project.update({
    where: { id },
    data: getProjectData(formData),
  });

  revalidateProjectViews();
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();

  const id = readText(formData, "id");

  if (!id) {
    return;
  }

  await prisma.project.delete({
    where: { id },
  });

  revalidateProjectViews();
}
