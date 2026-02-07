import { type Component } from 'vue'

export function useMarkdownContent<T extends { default: Component; order: number }>(
  modules: Record<string, T>,
) {
  type Entry = Omit<T, 'default'> & { component: Component }

  return (Object.values(modules) as T[])
    .map(
      ({ default: component, ...frontmatter }): Entry => ({ ...frontmatter, component }) as Entry,
    )
    .sort((a, b) => a.order - b.order)
}
