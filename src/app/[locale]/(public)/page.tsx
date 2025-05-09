'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from '@/components/TranslationsProvider';


export default function HomePage() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('tournament_tracking_title'),
      description: t('tournament_tracking_description'),
    },
    {
      title: t('points_system_title'),
      description: t('points_system_description'),
    },
    {
      title: t('player_profiles_title'),
      description: t('player_profiles_description'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">{t('welcome')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('description')}</p>
        <div className="flex justify-center space-x-4">
          <Button asChild>
            <Link href="/scoreboard">{t('view_scoreboard')}</Link>
          </Button>
          <Button asChild>
            <Link href="/tournaments">{t('view_tournaments')}</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
