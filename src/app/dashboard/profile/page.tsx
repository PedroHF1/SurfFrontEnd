'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Waves,
  Trophy,
  Target,
  Activity,
  Edit2,
  Camera,
  Save,
  X,
  Shield,
  KeyRound,
} from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth';
import { AuthContextUser } from '@/context/auth/props';
import { getMe, updateUser, UpdateUserData } from '@/services/users';
import { ForgotPasswordDialog } from '@/components/forgot-password-dialog';
import moment from 'moment';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<AuthContextUser | null>(null);
  const [profileData, setProfileData] = useState<Partial<AuthContextUser>>({});
  const [passwordResetOpen, setPasswordResetOpen] = useState(false);

  const fetchUser = async () => {
    setIsFetching(true);
    try {
      const user = await getMe();
      setUser(user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!profileData || Object.keys(profileData).length === 0) {
      toast.info('No changes were made.');
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      const updateData: UpdateUserData = {};

      if (profileData.name !== undefined && profileData.name !== null) {
        updateData.name = profileData.name;
      }
      if (profileData.address !== undefined && profileData.address !== null) {
        updateData.address = profileData.address;
      }
      if (profileData.city !== undefined && profileData.city !== null) {
        updateData.city = profileData.city;
      }
      if (profileData.state !== undefined && profileData.state !== null) {
        updateData.state = profileData.state;
      }

      const updatedUser = await updateUser(updateData);

      setUser(updatedUser);

      fetchUser();
      setIsEditing(false);
      setProfileData({});
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({});
  };

  if (isFetching) {
    return (
      <div className='space-y-6 max-w-6xl mx-auto'>
        <div>
          <Skeleton className='h-9 w-32 mb-2' />
          <Skeleton className='h-5 w-48' />
        </div>

        <Card className='overflow-hidden border-2'>
          <div className='h-32 bg-muted relative'>
            <Skeleton className='h-full w-full' />
          </div>
          <CardContent className='pt-0'>
            <div className='flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 relative'>
              <div className='relative'>
                <Skeleton className='h-32 w-32 rounded-full border-4 border-background' />
              </div>

              <div className='flex-1 space-y-2 w-full'>
                <Skeleton className='h-9 w-64' />
                <div className='flex flex-wrap gap-4 pt-2'>
                  <Skeleton className='h-5 w-40' />
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-5 w-36' />
                </div>
              </div>

              <div className='flex gap-2'>
                <Skeleton className='h-10 w-32' />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='grid gap-6 md:grid-cols-1'>
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2 mb-1.5'>
                <Skeleton className='h-5 w-5 rounded-full' />
                <Skeleton className='h-6 w-48' />
              </div>
              <Skeleton className='h-4 w-64' />
            </CardHeader>
            <CardContent className='space-y-4'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-10 w-full' />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6 max-w-6xl mx-auto max-md:ml-14 overflow-auto w-full'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Profile</h1>
        <p className='text-muted-foreground'>Manage your account</p>
      </div>

      <Card className='overflow-hidden border-2 hover:shadow-xl transition-all duration-300'>
        <div className='h-32 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 relative'>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJ3YXZlcyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMTBjMjUgMCAyNSAxMCA1MCAxMHMyNS0xMCA1MC0xMCAyNSAxMCA1MCAxMHYyMEgweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3dhdmVzKSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>
        <CardContent className='pt-0'>
          <div className='flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 relative'>
            <div className='relative group'>
              <Avatar className='h-32 w-32 border-4 border-background shadow-xl ring-2 ring-primary/20'>
                <AvatarImage src='' alt={user?.name || ''} />
                <AvatarFallback className='text-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white'>
                  <User size={44} />
                </AvatarFallback>
              </Avatar>
              {/* <button className='absolute bottom-2 right-2 p-2 bg-primary text-primary-foreground rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                <Camera className='h-4 w-4' />
              </button> */}
            </div>

            <div className='flex-1 space-y-2'>
              <div className='flex items-center gap-3'>
                <h2 className='text-3xl font-bold capitalize'>{user?.name}</h2>
              </div>
              <div className='flex flex-wrap gap-4 text-sm text-muted-foreground pt-2'>
                <div className='flex items-center gap-1'>
                  <Mail className='h-4 w-4' />
                  {user?.email}
                </div>
                <div className='flex items-center gap-1 capitalize'>
                  <MapPin className='h-4 w-4' />
                  {user?.address}
                </div>
                {user?.createdAt && (
                  <div className='flex items-center gap-1 capitalize'>
                    <Calendar className='h-4 w-4' />
                    Joined {moment(user?.createdAt).format('DD/MM/YYYY')}
                  </div>
                )}
              </div>
            </div>

            <div className='flex gap-2'>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className='gap-2'>
                  <Edit2 className='h-4 w-4' />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    className='gap-2'
                    disabled={isLoading}
                    loading={isLoading}
                  >
                    <Save className='h-4 w-4' />
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant='outline'
                    className='gap-2'
                    disabled={isLoading}
                  >
                    <X className='h-4 w-4' />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid gap-6 md:grid-cols-1'>
        <Card className='hover:shadow-lg transition-shadow duration-300'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5 text-primary' />
              Personal Information
            </CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                value={(profileData.name !== undefined ? profileData.name : user?.name) || ''}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                disabled={!isEditing}
                className='transition-all duration-200'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={user?.email || ''}
                disabled={true}
                className='transition-all duration-200 bg-muted'
                title='Email cannot be changed'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='address'>Address</Label>
              <Input
                id='address'
                value={
                  (profileData.address !== undefined ? profileData.address : user?.address) || ''
                }
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                disabled={!isEditing}
                className='transition-all duration-200'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='city'>City</Label>
              <Input
                id='city'
                value={(profileData.city !== undefined ? profileData.city : user?.city) || ''}
                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                disabled={!isEditing}
                className='transition-all duration-200'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='state'>State</Label>
              <Input
                id='state'
                value={(profileData.state !== undefined ? profileData.state : user?.state) || ''}
                onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                disabled={!isEditing}
                className='transition-all duration-200'
              />
            </div>
          </CardContent>
        </Card>

        <Card className='hover:shadow-lg transition-shadow duration-300'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='h-5 w-5 text-primary' />
              Security
            </CardTitle>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-start justify-between p-4 border rounded-lg'>
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <KeyRound className='h-4 w-4 text-muted-foreground' />
                  <p className='font-medium'>Password</p>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Request a password reset link to be sent to your email
                </p>
              </div>
              <Button
                variant='outline'
                onClick={() => setPasswordResetOpen(true)}
                className='gap-2'
              >
                <KeyRound className='h-4 w-4' />
                Reset Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ForgotPasswordDialog open={passwordResetOpen} onOpenChange={setPasswordResetOpen} />
    </div>
  );
};

export default ProfilePage;
